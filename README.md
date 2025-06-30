# Stellar Burgers :hamburger:  
Приложение для космической бургерной с возможностью сборки кастомных бургеров, отслеживанием заказов в реальном времени и управлением профилем.

## :sparkles: Функциональность

- **Конструктор бургеров**  
  Перетаскивание ингредиентов (DnD) для создания кастомного бургера
- **Система заказов**  
  Оформление заказов с защищёнными роутами
- **Live-обновления**  
  Отслеживание статуса заказов через WebSocket
- **Авторизация**  
  Регистрация, вход, восстановление пароля, обновление токенов
- **История заказов**  
  Просмотр личной истории заказов и детализации

## :computer: Технологии

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![WebSocket](https://img.shields.io/badge/-WebSocket-010101?logo=websocket&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white)
![Cypress](https://img.shields.io/badge/-Cypress-17202C?logo=cypress&logoColor=white)

Полный стек:  
`React` `Redux Toolkit` `TypeScript` `React DnD` `React Router v6` `WebSocket` `Jest` `Cypress` `Vite`

## :rocket: Запуск проекта

1. Клонировать репозиторий:
```bash
git clone https://github.com/DarKingRD/stellar-burgers.git
cd stellar-burgers
```

2. Установить зависимости:
```bash
npm install
```

3. Запустить dev-сервер:
```bash
npm run dev
```

4. Собрать production-версию:
```bash
npm run build
```

## :test_tube: Тестирование

**Unit-тесты:**
```bash
npm test
```

**E2E-тесты (Cypress):**
```bash
npm run cypress:open
```

**Component-тесты (Storybook):**
```bash
npm run storybook
```

## :file_folder: Структура проекта

```
src/
├── components/       # UI-компоненты
├── hooks/            # Кастомные хуки
├── services/         # API и WebSocket
├── store/            # Redux-хранилище
├── utils/            # Вспомогательные функции
├── pages/            # Страницы приложения
├── tests/            # Тесты
└── styles/           # Глобальные стили
```


Разработано [DarKingRD](https://github.com/DarKingRD) для Яндекс.Практикум :purple_heart:  
[Перейти к проекту](https://github.com/DarKingRD/stellar-burgers)
[Ссылка на сайт](https://darkingrd.github.io/stellar-burgers/)
