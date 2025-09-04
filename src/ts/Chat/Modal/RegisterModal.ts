/**
 * Класс модального окна регистрации пользователя в чате
 */
export default class RegisterModal {
  container: HTMLDivElement;
  modalElement: HTMLDivElement | null;
  inputElement: HTMLInputElement | null;
  errorElement: HTMLDivElement | null;
  submitCallback: ((nickname: string) => void) | null;

  /**
   * Конструктор класса модального окна
   * @param {HTMLDivElement} container - Контейнер, в котором будет отображено модальное окно
   */
  constructor(container: HTMLDivElement) {
    this.container = container;
    this.modalElement = null;
    this.inputElement = null;
    this.errorElement = null;

    this.submitCallback = null;
  }

  bindToDOM(): void {
    this.modalElement = document.createElement('div');
    this.modalElement.className = 'modal-overlay';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = 'Введите никнейм';
    modalContent.appendChild(title);

    const formElement = document.createElement('form');
    formElement.className = 'modal-form';

    this.inputElement = document.createElement('input');
    this.inputElement.className = 'modal-input';
    this.inputElement.type = 'text';
    this.inputElement.placeholder = 'Никнейм';
    formElement.appendChild(this.inputElement);

    this.errorElement = document.createElement('div');
    this.errorElement.className = 'modal-error';
    formElement.appendChild(this.errorElement);

    const submitButton = document.createElement('button');
    submitButton.className = 'modal-button';
    submitButton.type = 'submit';
    submitButton.textContent = 'Войти';
    formElement.appendChild(submitButton);

    modalContent.appendChild(formElement);
    this.modalElement.appendChild(modalContent);
    this.container.appendChild(this.modalElement);

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.inputElement) {
        const nickname = this.inputElement.value.trim();
        if (nickname && this.submitCallback) this.submitCallback(nickname);
      }
    });

    this.inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitButton.click();
      }
    });
  }

  registerEvents(): void {}

  open(submitCallback: (nickname: string) => void): void {
    this.submitCallback = submitCallback;

    if (!this.modalElement) this.bindToDOM();
    if (this.modalElement) this.modalElement.style.display = 'flex';
    if (this.inputElement) {
      this.inputElement.value = '';
      this.inputElement.focus();
    }
    if (this.errorElement) this.errorElement.textContent = '';
  }

  close(): void {
    if (this.modalElement) this.modalElement.style.display = 'none';
  }

  render(): void {}

  destroy(): void {
    if (this.modalElement) {
      this.container.removeChild(this.modalElement);
      this.modalElement = null;
      this.inputElement = null;
      this.errorElement = null;
      this.submitCallback = null;
    }
  }

  showError(message: string): void {
    if (this.errorElement) this.errorElement.textContent = message;
  }
}
