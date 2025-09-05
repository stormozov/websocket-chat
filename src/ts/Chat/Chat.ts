import ChatAPI from './api/ChatAPI';
import SessionManager from './managers/SessionManager';
import { IChat } from './shared/interfaces';
import ChatWindow from './ui/ChatWindow';
import RegisterModal from './ui/RegisterModal';

/**
 * Класс приложения чата
 */
export default class Chat implements IChat {
  private _container: HTMLDivElement;
  private _api: ChatAPI;
  private _websocket: null | WebSocket;
  private _registerModal: RegisterModal;
  private _currentUser: { id: string; name: string } | null;
  private _serverUrl: string | undefined;

  /**
   * Конструктор класса приложения чата
   * @param {HTMLDivElement} container - Контейнер, в котором должно быть отображено приложение
   */
  constructor(container: HTMLDivElement) {
    this._container = container;
    this._api = new ChatAPI();
    this._websocket = null;
    this._registerModal = new RegisterModal(this._container);
    this._currentUser = null;
    this._serverUrl = process.env.SERVER_URL;
  }

  /**
   * Инициализация приложения чата
   */
  init(): void {
    const savedUser = SessionManager.loadUser();
    if (savedUser) {
      this._currentUser = savedUser;
      this._initializeChat();
    } else {
      this._registerModal.open(this._handleNicknameSubmit.bind(this));
    }
  }

  bindToDOM(): void {
    const chatContainer = this._container.querySelector('.container');
    if (chatContainer instanceof HTMLDivElement) {
      const chatWindow = new ChatWindow(chatContainer);
      chatWindow.render();
    }
  }

  registerEvents(): void {}

  subscribeOnEvents(): void {}

  onEnterChatHandler(): void {}

  sendMessage(): void {}

  renderMessage(): void {}

  /**
   * Обработчик отправки никнейма пользователем и отправка его на сервер
   * @param {string} nickname - Никнейм, введенный пользователем через модальное окно
   * @returns {Promise<void>} Промис с результатом операции
   */
  private async _handleNicknameSubmit(nickname: string): Promise<void> {
    try {
      const response = await fetch(`http://${this._serverUrl}/new-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nickname }),
      });

      const result = await response.json();

      if (result.status === 'ok') {
        this._currentUser = result.user;
        SessionManager.saveUser(result.user);
        this._registerModal.close();
        this._initializeChat();
      }

      this._registerModal.showError(result.message);
    } catch (error) {
      console.error('Error checking nickname availability:', error);
      this._registerModal.showError('Ошибка подключения к серверу');
    }
  }

  /**
   * Инициализирует чат
   */
  private _initializeChat(): void {
    this._connectWebSocket();
    this.bindToDOM();
    this.registerEvents();
    this.subscribeOnEvents();
  }

  /**
   * Подключает WebSocket к серверу
   */
  private _connectWebSocket(): void {
    this._websocket = new WebSocket(`ws://${this._serverUrl}`);

    this._websocket.onopen = (): void => {
      console.log('WebSocket connection established');
    };

    this._websocket.onmessage = (event: MessageEvent): void => {
      const data = JSON.parse(event.data);
      this._handleWebSocketMessage(data);
    };

    this._websocket.onclose = (): void => {
      console.log('WebSocket connection closed');
    };

    this._websocket.onerror = (error: Event): void => {
      console.error('WebSocket error:', error);
    };
  }

  /**
   * Обработчик сообщений WebSocket
   * @param {any} data - Данные сообщения
   */
  private _handleWebSocketMessage(data: any): void {
    if (Array.isArray(data)) {
      console.log('User list updated:', data);
    } else if (data.type === 'send') {
      this.renderMessage();
    } else if (data.type === 'exit' && this._currentUser) {
      SessionManager.clearUser();
      this._currentUser = null;
    }
  }
}
