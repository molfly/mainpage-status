# mainpage-status

Статус-страница для главной страницы.

## Структура

- `site/` — статус-страница (сайт)
- `docs/` — документация
- `tasks/` — задачи
- `tickets/` — тикеты работ
- `data/` — реестр источников меню (`menusources.json`)
- `tools/` — скрипты сборки (`fetch-menus.mjs`)

## Сборка

`node tools/fetch-menus.mjs` — качает фото меню из источников в `site/assets/`
и генерирует `site/data/menus.js`. Токен VK — в `.env` (`VK_TOKEN`) или в секретах CI.
Деплой на GitHub Pages — через `.github/workflows/build.yml` (нужно включить Pages
в настройках репозитория и задать секрет `VK_TOKEN`).
