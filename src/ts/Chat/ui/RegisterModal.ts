import { ICreateElementOptions } from '../../shared/interfaces';
import createElement from '../../utils/createElementFunction';

/**
 * Класс модального окна регистрации пользователя в чате
 */
export default class RegisterModal {
  private _container: HTMLElement;

  private _modalElement: HTMLElement | null;
  private _contentElement: HTMLElement | null;
  private _titleElement: HTMLElement | null;
  private _textElement: HTMLElement | null;

  private _formGroup: HTMLElement | null;
  private _inputElement: HTMLElement | null;
  private _formElement: HTMLElement | null;
  private _submitButton: HTMLElement | null;

  private _errorElement: HTMLElement | null;

  private _submitCallback: ((nickname: string) => void) | null;

  /**
   * Конструктор класса модального окна
   * @param {HTMLDivElement} container - Контейнер, в котором будет отображено модальное окно
   */
  constructor(container: HTMLDivElement) {
    this._container = container;

    this._modalElement = null;
    this._contentElement = null;
    this._titleElement = null;
    this._textElement = null;

    this._formElement = null;
    this._formGroup = null;
    this._inputElement = null;
    this._submitButton = null;

    this._errorElement = null;

    this._submitCallback = null;
  }

  /**
   * Привязывает модальное окно к DOM
   */
  bindToDOM(): void {
    // Защита от повторной привязки
    if (this._modalElement || this._container.querySelector('.modal-overlay')) {
      console.warn('Модальное окно уже привязано к DOM');
      return;
    }

    // Получаем конфигурацию модального окна
    const configs = this._getModalConfigs();
    const {
      overlay,
      content,
      title,
      textUnderTitle,
      form,
      _formGroup,
      input,
      button,
      error,
    } = configs;

    // Создаем элементы модального окна
    this._modalElement = createElement(overlay);
    this._contentElement = createElement(content);
    this._titleElement = createElement(title);
    this._textElement = createElement(textUnderTitle);
    this._formElement = createElement(form);
    this._formGroup = createElement(_formGroup);
    this._inputElement = createElement(input);
    this._submitButton = createElement(button);
    this._errorElement = createElement(error);

    // Добавляем элементы в DOM
    this._formGroup.append(this._inputElement, this._submitButton);
    this._formElement.append(this._formGroup, this._errorElement);
    this._contentElement.append(
      this._titleElement,
      this._textElement,
      this._formElement
    );
    this._modalElement.append(this._contentElement);
    this._container.append(this._modalElement);

    // Регистрируем события
    this._registerEvents();
  }

  /**
   * Отображает модальное окно регистрации пользователя
   * @param {Function} submitCallback - Функция-обработчик отправки никнейма
   */
  open(submitCallback: (nickname: string) => void): void {
    this._submitCallback = submitCallback;

    if (!this._modalElement) this.bindToDOM();
    if (this._modalElement) this._modalElement.style.display = 'flex';
    if (this._inputElement) {
      if (this._inputElement instanceof HTMLInputElement) {
        this._inputElement.value = '';
        this._inputElement.focus();
      }
    }
    if (this._errorElement) this._errorElement.textContent = '';
  }

  close(): void {
    if (this._modalElement) this._modalElement.style.display = 'none';
  }

  /**
   * Удаляет модальное окно из DOM
   */
  destroy(): void {
    if (this._modalElement) {
      this._container.removeChild(this._modalElement);

      this._modalElement = null;
      this._contentElement = null;
      this._titleElement = null;
      this._textElement = null;

      this._formElement = null;
      this._formGroup = null;
      this._inputElement = null;
      this._submitButton = null;

      this._errorElement = null;

      this._submitCallback = null;
    }
  }

  /**
   * Устанавливает текст ошибки в модальном окне
   * @param {string} message - Текст ошибки
   */
  showError(message: string): void {
    if (this._errorElement) {
      this._errorElement.textContent = message;
      this._errorElement.classList.remove('modal-error--hidden');
    }
  }

  /**
   * Регистрирует события модального окна
   */
  private _registerEvents(): void {
    if (this._formElement && this._inputElement) {
      this._formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        if (this._inputElement instanceof HTMLInputElement) {
          const nickname = this._inputElement.value.trim();
          if (nickname && this._submitCallback) this._submitCallback(nickname);
        }
      });

      this._inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (this._submitButton) this._submitButton.click();
        }
      });
    }
  }

  /**
   * Возвращает конфигурацию модального окна
   * @returns {Record<string, ICreateElementOptions>} Конфигурация модального окна
   */
  private _getModalConfigs(): Record<string, ICreateElementOptions> {
    return {
      overlay: {
        tag: 'div',
        className: 'modal-overlay',
      },
      content: {
        tag: 'div',
        className: 'modal-content',
      },
      title: {
        tag: 'p',
        className: 'modal-title',
        text: 'Выбери свой уникальный никнейм',
      },
      textUnderTitle: {
        tag: 'p',
        className: 'modal-text',
        text: 'Никнейм — это ваше виртуальное имя, по которому вас будут узнавать другие участники чата. Выберите запоминающийся и отражающий вашу индивидуальность псевдоним.',
      },
      form: {
        tag: 'form',
        className: 'modal-form',
      },
      _formGroup: {
        tag: 'div',
        className: 'modal-form-group',
      },
      input: {
        tag: 'input',
        id: 'nickname-input',
        className: 'modal-input',
        attrs: { type: 'text', placeholder: 'Никнейм' },
      },
      button: {
        tag: 'button',
        className: 'modal-button',
        text: 'Войти',
      },
      error: {
        tag: 'div',
        className: ['modal-error', 'modal-error--hidden'],
      },
    };
  }
}
