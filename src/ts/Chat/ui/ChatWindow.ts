import { ICreateElementOptions } from '../../shared/interfaces';
import createElement from '../../utils/createElementFunction';
import { UserType } from '../shared/types';

export default class ChatWindow {
  private _membersList: HTMLUListElement | null = null;

  constructor(private _container: HTMLDivElement) {}

  render(): void {
    this._createChatUI();
    this._membersList = this._container.querySelector(
      '.chat-members__list'
    ) as HTMLUListElement;
  }

  updateMembersList(
    users: UserType[],
    currentUser: { id: string; name: string } | null
  ): void {
    if (!this._membersList) return;

    this._membersList.innerHTML = '';
    users.forEach((user) => {
      const isCurrentUser = currentUser && user.id === currentUser.id;
      const li = createElement({
        tag: 'li',
        className: 'chat-members__item',
        attrs: {
          title: `Ник пользователя: "${user.name}"`,
        },
        children: [
          {
            tag: 'div',
            className: 'chat-members__avatar',
            children: [
              {
                tag: 'span',
                text: user.name[0],
              },
            ],
          },
          {
            tag: 'span',
            className: 'chat-members__nickname',
            text: user.name,
          },
          ...(isCurrentUser
            ? [
                {
                  tag: 'span',
                  className: 'chat-members__badge',
                  text: 'Вы',
                },
              ]
            : []),
        ],
      });

      if (this._membersList) this._membersList.append(li);
    });
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
