# Stellar Burgers

## Как запустить локально:

```bash
git clone https://github.com/DarKingRD/stellar-burgers.git
cd stellar-burgers
npm i
cp .env.example .env
npm start
```

## Деплой на GitHub Pages

Проект настроен для автоматического деплоя на GitHub Pages. Для активации:

1. Перейдите в настройки репозитория на GitHub
2. В разделе "Pages" выберите источник "GitHub Actions"
3. При каждом push в ветку `main` или `master` будет происходить автоматический деплой

### Ручной деплой:

```bash
npm run build
```

Собранные файлы будут в папке `dist/`.

### Ссылка на сайт:

После настройки GitHub Pages, сайт будет доступен по адресу:
`https://darkingrd.github.io/stellar-burgers/`