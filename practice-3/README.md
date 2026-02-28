# Практическое занятие №3 — JSON и внешние API

## Задание

1. **Протестировать API из практики 2 в Postman** — не менее 3 запросов.
2. **Выбрать внешний API**, получить ключ, изучить документацию и выполнить **не менее 5 запросов**.
3. **Собрать скриншоты** результатов в один файл и добавить в репозиторий.

---

## Часть 1. Тестирование нашего API в Postman

### Шаги

1. Запустите сервер: `node app.js` (порт 3000).
2. Установите [Postman](https://www.postman.com/downloads/) или откройте [веб-версию](https://web.postman.com/).
3. Импортируйте коллекцию:
   - Postman → **Import** → выберите файл `postman/Products-API.postman_collection.json` из этого репозитория.
4. Выполните **не менее 3 запросов**, например:
   - **GET** `http://localhost:3000/products` — все товары
   - **GET** `http://localhost:3000/products/1` — товар по id
   - **POST** `http://localhost:3000/products` — добавить товар (в Body → raw → JSON: `{"name": "Тест", "price": 100}`)
   - **PATCH** `http://localhost:3000/products/1` — изменить товар
   - **DELETE** `http://localhost:3000/products/2` — удалить товар
5. Сделайте **скриншоты** ответов для отчёта.

---

## Часть 2. Внешний API (не менее 5 запросов)

Нужно выбрать любой открытый API, получить ключ (если требуется) и выполнить не менее 5 запросов. Ниже — примеры бесплатных API.

### Вариант A: JSONPlaceholder (без ключа)

Документация: https://jsonplaceholder.typicode.com/

- Базовый URL: `https://jsonplaceholder.typicode.com`
- Примеры запросов (5 штук):
  1. `GET /posts` — список постов
  2. `GET /posts/1` — один пост
  3. `GET /users` — список пользователей
  4. `GET /users/1` — один пользователь
  5. `GET /comments?postId=1` — комментарии к посту

Ключ не нужен. В Postman создайте запросы и сделайте скриншоты ответов.

### Вариант B: OpenWeatherMap (нужен ключ)

Документация: https://openweathermap.org/api

1. Регистрация: https://openweathermap.org/api — получить бесплатный API key.
2. Запрос погоды (в URL подставьте свой ключ):
   ```
   GET https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=ВАШ_КЛЮЧ&units=metric&lang=ru
   ```
3. Не менее 5 запросов: разные города (Moscow, London, Paris, Berlin, Tokyo) или один город + прогноз на 5 дней и т.д. — по документации.

### Вариант C: ExchangeRate-API (нужен ключ)

Документация: https://www.exchangerate-api.com/docs

1. Ключ: https://www.exchangerate-api.com/ (бесплатный план).
2. Пример:
   ```
   GET https://v6.exchangerate-api.com/v6/ВАШ_КЛЮЧ/latest/USD
   ```
3. Не менее 5 запросов: разные валюты (latest/USD, latest/EUR, latest/RUB, pair/USD/RUB, pair/EUR/RUB и т.д.) — по документации.

### Вариант D: Открытые API (Россия)

Каталог: https://github.com/public-api-lists/public-api-lists или поиск «открытые API Россия».

Выберите любой API с документацией, получите ключ при необходимости и выполните 5+ запросов в Postman.

---

## Формат отчёта

1. Соберите скриншоты в **один файл** (PDF или Word):
   - минимум 3 скриншота по части 1 (наше API в Postman);
   - минимум 5 скриншотов по части 2 (внешний API в Postman).
2. Сохраните файл в папку **`practice-3/screenshots/`** (например, `Практика-3-скриншоты.pdf` или `report.docx`).
3. Загрузите изменения в репозиторий.
4. В СДО прикрепите ссылку на репозиторий: **Задания для самостоятельной работы → Практические занятия 3-4**.
