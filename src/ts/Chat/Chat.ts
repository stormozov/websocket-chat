import ChatAPI from './api/ChatAPI';

export default class Chat {
  container: HTMLDivElement;
  api: ChatAPI;
  websocket: null;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;
  }

  init(): void {}

  bindToDOM(): void {}

  registerEvents(): void {}

  subscribeOnEvents(): void {}

  onEnterChatHandler(): void {}

  sendMessage(): void {}

  renderMessage(): void {}
}
