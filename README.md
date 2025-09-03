# Корпоративный чат с использованием Websockets

## 🚀 Быстрый старт

1. Установка зависимостей

```bash
yarn install
```

> Проект использует Yarn 1.x . Убедись, что у тебя установлен yarn@1.22.22 или выше.

2. Запуск в режиме разработки

```bash
yarn start
```

Откроется локальный сервер на http://localhost:8080 с HMR.

3. Сборка для продакшена

```bash
yarn build
```

Результат будет в папке dist/.

4. Анализ размера бандла

```bash
yarn bundle:analyze
```

Откроет визуализатор размера бандла в браузере.

---

## 🧰 Доступные команды

| Команда               | Описание                              |
| --------------------- | ------------------------------------- |
| `yarn start`          | Запуск dev-сервера с HMR              |
| `yarn build`          | Продакшен-сборка                      |
| `yarn bundle:analyze` | Анализ размера бандла                 |
| `yarn lint`           | Проверка кода через ESLint            |
| `yarn lint:fix`       | Автоисправление ошибок линтинга       |
| `yarn format`         | Форматирование кода через Prettier    |
| `yarn format:check`   | Проверка форматирования без изменений |
| `yarn test`           | Запуск тестов один раз                |
| `yarn test:watch`     | Запуск тестов в режиме слежения       |
| `yarn test:coverage`  | Запуск тестов с отчётом покрытия      |

---

## 🧹 Линтинг и форматирование

Проект использует:

- ESLint с [@typescript-eslint](https://www.npmjs.com/package/typescript-eslint) и [prettier](https://www.npmjs.com/package/prettier)
- Prettier — для единообразного форматирования

Перед коммитом запускаются проверки через [husky](https://www.npmjs.com/package/husky) и [lint-staged](https://www.npmjs.com/package/lint-staged), поэтому:

- Некорректный код не пройдёт коммит
- Ты можешь запустить исправления вручную:

```bash
yarn lint:fix
yarn format
```

---

## 🌐 Поддержка браузеров

Определяется через `browserslist`:

- Production : > 1%, последние 2 версии, не dead
- Development : последние версии Chrome, Firefox, Safari

---

## 🔐 Environment Variables

Для работы с переменными окружения используется `dotenv-webpack`.
Создай файл `.env` в корне проекта:

```env
PORT=8080
NODE_ENV=development
```

Доступ в коде: `process.env.PORT`

> ⚠️ Файл `.env` не должен быть в репозитории. Используй `.env.example`.

---

## 🧩 Структура проекта

```
webpack/
  webpack.common.mjs    # Общие настройки
  webpack.dev.mjs       # Настройки разработки
  webpack.prod.mjs      # Продакшен-настройки

src/
  index.ts              # Точка входа
  index.html            # Шаблон HTML
  styles/
  assets/
  components/           # Опционально

dist/                   # Результат сборки (автогенерируется)
coverage/               # Отчёт о тестовом покрытии
stats.json              # Данные для bundle анализатора
```

---

## 🛠️ Требования

- Node.js >= 18.x
- Yarn >= 1.22
