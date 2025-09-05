import { ICreateElementOptions } from '../../shared/interfaces';
import createElement from '../../utils/createElementFunction';

export default class ChatWindow {
  constructor(private _container: HTMLDivElement) {}

  render(): void {
    this._createChatUI();
  }

  private _createChatUI(): void {
    const chatWindow = createElement(this._getUIConfig());
    this._container.append(chatWindow);
  }

  private _getUIConfig(): ICreateElementOptions {
    return {
      tag: 'div',
      className: 'chat',
      children: [
        {
          tag: 'div',
          className: 'chat-members',
          children: [
            {
              tag: 'p',
              className: 'chat-members__title',
              text: 'Участники чата',
            },
            {
              tag: 'ul',
              className: 'chat-members__list',
            },
          ],
        },
        {
          tag: 'div',
          className: 'chat-messages',
          children: [
            {
              tag: 'div',
              className: 'chat-messages__message-list',
            },
            {
              tag: 'form',
              className: 'chat-messages__message-form',
              children: [
                {
                  tag: 'textarea',
                  className: 'chat-messages__message-form-textarea',
                  attrs: {
                    id: 'message-textarea',
                    type: 'text',
                    placeholder: 'Введите ваше сообщение тут...',
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
