# Фронтенд и бэкенд разработка — практические занятия

Репозиторий с решениями практических занятий по дисциплине «Фронтенд и бэкенд разработка» (4 семестр, 2025/2026).

---

## Описание проекта

В проекте реализованы пять практических работ:

| Практика | Тема | Реализация |
|----------|------|-------------|
| **1** | CSS-препроцессоры (SASS) | Карточка товара: переменные, миксин, вложенность селекторов |
| **2** | Сервер на Node.js + Express | REST API с CRUD для товаров и пользователей |
| **3** | JSON и внешние API | Тестирование API в Postman (собственное + внешнее) |
| **4** | API + React | Интернет-магазин: React-клиент и Express API, CRUD товаров (≥10), карточка: название, категория, описание, цена, кол-во на складе, рейтинг, фото |
| **5** | Расширенный REST API (Swagger) | swagger-jsdoc + swagger-ui-express: схема User, CRUD /api/users, интерактивная документация на /api-docs |

### Технологии

- **Фронтенд:** HTML, CSS, SASS, JavaScript, **React** (Vite), Axios
- **Бэкенд:** Node.js, Express.js, CORS, nanoid, **Swagger** (swagger-jsdoc, swagger-ui-express)
- **Тестирование API:** Postman

### Структура проекта

```
frontend-backend/
├── index.html          # Карточка товара (практика 1)
├── styles.scss, styles.css
├── products.html       # Страница для работы с API товаров
├── app.js              # Сервер Express + API магазина /api/products (практика 4)
├── package.json
├── client/             # React-приложение интернет-магазина (практика 4)
│   ├── src/
│   │   ├── api/        # Axios-клиент для /api/products
│   │   ├── components/ # ProductCard, ProductList, ProductModal
│   │   └── pages/ShopPage/
│   ├── package.json
│   └── vite.config.js
├── postman/
├── practice-3/
├── photos/
└── README.md
```

---

## Запуск проекта

### Требования

- Node.js (рекомендуется LTS)
- npm

### Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск сервера (порт 3000)
npm start
# или
node app.js
```

После запуска:

- **Главная страница (API товаров):** http://localhost:3000  
- **Swagger UI (практика 5):** http://localhost:3000/api-docs  
- **Карточка товара (практика 1):** http://localhost:3000/index.html  
- **API товаров:** http://localhost:3000/products  
- **API пользователей:** http://localhost:3000/users, http://localhost:3000/api/users  

### Сборка CSS (практика 1)

```bash
npm run build:css      # Одна компиляция SASS → CSS
npm run watch:css     # Компиляция при изменении файлов
```

### Интернет-магазин — практика 4 (React + API)

Запускаются **два процесса**: бэкенд и фронтенд.

**Терминал 1 — сервер (порт 3000):**
```bash
npm start
# или: node app.js
```

**Терминал 2 — React-клиент (порт 5173):**
```bash
cd client
npm install
npm run dev
```

Открой в браузере: **http://localhost:5173** — каталог товаров с добавлением, редактированием и удалением через API.

---

## API (практика 2 и 4)

### Товары (`/products`)

| Метод | URL | Описание |
|-------|-----|----------|
| GET | /products | Список всех товаров |
| GET | /products/:id | Товар по id |
| POST | /products | Добавить товар (body: `{ "name": "...", "price": число }`) |
| PATCH | /products/:id | Изменить товар |
| DELETE | /products/:id | Удалить товар |

Объект товара: `id`, `name` (название), `price` (стоимость).

### Пользователи (`/users`)

| Метод | URL | Описание |
|-------|-----|----------|
| GET | /users | Список всех пользователей |
| GET | /users/:id | Пользователь по id |
| POST | /users | Добавить пользователя (body: `{ "name": "...", "age": число }`) |
| PATCH | /users/:id | Изменить пользователя |
| DELETE | /users/:id | Удалить пользователя |

Объект пользователя: `id`, `name`, `age`.

### API пользователей с Swagger (практика 5) — `/api/users`

Те же операции по маршрутам с префиксом `/api` (документируются в Swagger):  
GET/POST `/api/users`, GET/PATCH/DELETE `/api/users/:id`. Id — строка (nanoid). Документация: **/api-docs**.

### API магазина для React (практика 4) — `/api/products`

| Метод | URL | Описание |
|-------|-----|----------|
| GET | /api/products | Список всех товаров магазина |
| GET | /api/products/:id | Товар по id (nanoid) |
| POST | /api/products | Добавить товар |
| PATCH | /api/products/:id | Изменить товар |
| DELETE | /api/products/:id | Удалить товар |

Объект товара: `id`, `name`, `category`, `description`, `price`, `stock`, `rating` (опц.), `image` (опц.). В начале в магазине 11 товаров (электроника, аксессуары, аудио и т.д.).

---

## Отчёт по практическому занятию №3 — JSON и внешние API

### Задание

1. Протестировать реализованное API (практика 2) в Postman — **не менее 3 запросов**.
2. Выбрать внешний API, изучить документацию и выполнить **не менее 5 запросов**.
3. Собрать скриншоты результатов в репозиторий.

### Часть 1. Тестирование своего API в Postman

Собственное API (товары и/или пользователи) тестировалось в Postman. Выполнены запросы к эндпоинтам сервера на `http://localhost:3000`.

**Скриншоты результатов** расположены в папке [`photos/my-api/`](photos/my-api/):

| № | Файл | Описание |
|---|------|----------|
| 1 | [image1.png](photos/my-api/image1.png) | Первый запрос (например, GET /products или GET /users) |
| 2 | [image2.png](photos/my-api/image2.png) | Второй запрос |
| 3 | [image3.png](photos/my-api/image3.png) | Третий запрос |

Использованы коллекции Postman из папки `postman/`:
- `Products-API.postman_collection.json` — CRUD товаров
- `Users-API.postman_collection.json` — CRUD пользователей

---

### Часть 2. Тестирование внешнего API в Postman

Выбран внешний API (в соответствии с заданием: изучена документация, при необходимости получен ключ). Выполнено не менее 5 запросов.

**Скриншоты результатов** расположены в папке [`photos/another-api/`](photos/another-api/):

| № | Файл | Описание |
|---|------|----------|
| 1 | [image1.png](photos/another-api/image1.png) | Запрос 1 |
| 2 | [image2.png](photos/another-api/image2.png) | Запрос 2 |
| 3 | [image3.png](photos/another-api/image3.png) | Запрос 3 |
| 4 | [image4.png](photos/another-api/image4.png) | Запрос 4 |
| 5 | [image5.png](photos/another-api/image5.png) | Запрос 5 |

---

### Итог по практике 3

- Собственное API протестировано в Postman (≥3 запроса), скриншоты — в `photos/my-api/`.
- Внешний API протестирован в Postman (≥5 запросов), скриншоты — в `photos/another-api/`.

---

## Практическое занятие №4 — API + React

Реализован **интернет-магазин** (тематика: электроника и аксессуары): два приложения (React и Express), связанных в одну систему.

- **Бэкенд:** маршруты `/api/products` с CRUD, идентификаторы nanoid, CORS для клиента на порту 5173.
- **Фронтенд:** React (Vite), страница каталога, карточки товаров, модальное окно для добавления и редактирования. Запросы к API через Axios.
- **Карточка товара:** название, категория, описание, цена, количество на складе; опционально рейтинг и изображение.
- **Товаров в каталоге:** не менее 10 (в начальных данных — 11).

---

## Практическое занятие №5 — Расширенный REST API (Swagger)

Подключены **swagger-jsdoc** и **swagger-ui-express**. С помощью JSDoc-аннотаций описаны:

- **Схема User** (id, name, age) в `components/schemas/User`.
- **CRUD по пользователям:**  
  POST /api/users, GET /api/users, GET /api/users/:id, PATCH /api/users/:id, DELETE /api/users/:id.

Документация доступна по адресу **http://localhost:3000/api-docs** и работает в интерактивном режиме (кнопка «Try it out» для тестовых запросов).

Ссылка на репозиторий сдаётся в СДО: *Задания для самостоятельной работы → Практические занятия 5–6*.

---

## Публикация на GitHub Pages

Как включить сайт на GitHub Pages (статическая страница или React через Actions), см. **[GITHUB_PAGES.md](GITHUB_PAGES.md)**.

---