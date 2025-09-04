/**
 * Интерфейс чата
 */
export interface IChat {
  // Методы
  init: () => void;
  bindToDOM: () => void;
  registerEvents: () => void;
  subscribeOnEvents: () => void;
  onEnterChatHandler: () => void;
  sendMessage: () => void;
  renderMessage: () => void;
}

/**
 * Интерфейс сущности
 */
export interface IEntity {
  list: () => void;
  get: () => void;
  create: () => void;
  update: () => void;
  delete: () => void;
}

/**
 * Интерфейс модального окна
 */
export interface IModal {
  container: HTMLDivElement;

  bindToDOM: () => void;
  registerEvents: () => void;
  open: () => void;
  close: () => void;
  render: () => void;
  destroy: () => void;
}
