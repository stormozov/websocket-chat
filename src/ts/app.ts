import Chat from './Chat/Chat';

const init = (): void => {
  const chatContainer = document.getElementById('root');
  let chat: Chat | null = null;

  if (chatContainer && chatContainer instanceof HTMLDivElement) {
    chat = new Chat(chatContainer);
    chat.init();
  }
};

document.addEventListener('DOMContentLoaded', init);
