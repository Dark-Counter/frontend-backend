/**
 * Практические занятия 2–5 — Сервер Node.js + Express
 * API: товары, пользователи, магазин /api/products, Swagger /api-docs (практика 5)
 */

const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

// CORS для React-клиента (практика 4)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Начальный список товаров (практика 2 — задание)
let products = [
  { id: 1, name: 'Классические часы', price: 5990 },
  { id: 2, name: 'Беспроводные наушники', price: 3490 },
  { id: 3, name: 'Портативная колонка', price: 2490 },
];

// Товары интернет-магазина (практика 4): название, категория, описание, цена, кол-во на складе
let shopProducts = [
  { id: nanoid(6), name: 'Классические часы', category: 'Аксессуары', description: 'Элегантные наручные часы с кожаным ремешком.', price: 5990, stock: 15, rating: 4.8, image: '/watches.png' },
  { id: nanoid(6), name: 'Беспроводные наушники', category: 'Аудио', description: 'Наушники с шумоподавлением и до 30 часов работы.', price: 3490, stock: 42, rating: 4.6, image: '' },
  { id: nanoid(6), name: 'Портативная колонка', category: 'Аудио', description: 'Водозащищённая колонка с мощным звуком.', price: 2490, stock: 28, rating: 4.5, image: '' },
  { id: nanoid(6), name: 'Смартфон', category: 'Электроника', description: 'Смартфон с AMOLED-экраном и тройной камерой.', price: 24990, stock: 12, rating: 4.7, image: '' },
  { id: nanoid(6), name: 'Ноутбук', category: 'Электроника', description: 'Лёгкий ноутбук для работы и учёбы.', price: 54990, stock: 8, rating: 4.9, image: '' },
  { id: nanoid(6), name: 'Чехол для телефона', category: 'Аксессуары', description: 'Силиконовый чехол с защитой от ударов.', price: 590, stock: 100, rating: 4.3, image: '' },
  { id: nanoid(6), name: 'Зарядное устройство', category: 'Электроника', description: 'Быстрая зарядка 20 Вт с кабелем USB-C.', price: 1290, stock: 55, rating: 4.4, image: '' },
  { id: nanoid(6), name: 'Рюкзак', category: 'Аксессуары', description: 'Рюкзак с отделением для ноутбука до 15".', price: 3990, stock: 22, rating: 4.6, image: '' },
  { id: nanoid(6), name: 'Фитнес-браслет', category: 'Гаджеты', description: 'Отслеживание пульса, шагов и сна.', price: 1990, stock: 35, rating: 4.2, image: '' },
  { id: nanoid(6), name: 'Электронная книга', category: 'Электроника', description: 'Читалка с подсветкой и защитой от воды.', price: 8990, stock: 18, rating: 4.8, image: '' },
  { id: nanoid(6), name: 'Внешний SSD 512 ГБ', category: 'Электроника', description: 'Портативный диск для бэкапов и переноса файлов.', price: 5490, stock: 30, rating: 4.7, image: '' },
];

// Пользователи (id — nanoid для /api/users и Swagger, практика 5)
let users = [
  { id: nanoid(6), name: 'Петр', age: 16 },
  { id: nanoid(6), name: 'Иван', age: 18 },
  { id: nanoid(6), name: 'Дарья', age: 20 },
];

// ————— Swagger (практика 5) —————
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API управления пользователями',
      version: '1.0.0',
      description: 'CRUD пользователей (User). Документация по практическому занятию 5.',
    },
    servers: [{ url: `http://localhost:${port}`, description: 'Локальный сервер' }],
  },
  apis: ['./app.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware для парсинга JSON
app.use(express.json());
// Middleware для парсинга данных форм
app.use(express.urlencoded({ extended: false }));
// Раздача статики (HTML, CSS, картинки) — чтобы фронт и API были с одного origin
app.use(express.static(__dirname));
// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Главная — страница для работы с API товаров
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/products.html');
});

// ————— API пользователей с Swagger (практика 5): /api/users —————

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: [name, age]
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный ID (nanoid)
 *         name:
 *           type: string
 *           description: Имя пользователя
 *         age:
 *           type: integer
 *           description: Возраст пользователя
 *       example:
 *         id: "abc123"
 *         name: "Петр"
 *         age: 16
 */
function findUserOr404(id, res) {
  const user = users.find((u) => u.id === id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return null;
  }
  return user;
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создать пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, age]
 *             properties:
 *               name: { type: string }
 *               age: { type: integer }
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Ошибка в теле запроса
 */
app.post('/api/users', (req, res) => {
  const { name, age } = req.body;
  if (!name || age === undefined) {
    return res.status(400).json({ error: 'Name and age are required' });
  }
  const newUser = { id: nanoid(6), name: String(name).trim(), age: Number(age) };
  users.push(newUser);
  res.status(201).json(newUser);
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Список всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Массив пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/User' }
 */
app.get('/api/users', (req, res) => res.json(users));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       404:
 *         description: Пользователь не найден
 */
app.get('/api/users/:id', (req, res) => {
  const user = findUserOr404(req.params.id, res);
  if (!user) return;
  res.json(user);
});

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Обновить пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               age: { type: integer }
 *     responses:
 *       200:
 *         description: Обновлённый пользователь
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Пользователь не найден
 */
app.patch('/api/users/:id', (req, res) => {
  const user = findUserOr404(req.params.id, res);
  if (!user) return;
  if (req.body?.name === undefined && req.body?.age === undefined) {
    return res.status(400).json({ error: 'Nothing to update' });
  }
  const { name, age } = req.body;
  if (name !== undefined) user.name = String(name).trim();
  if (age !== undefined) user.age = Number(age);
  res.json(user);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Пользователь удалён (тела ответа нет)
 *       404:
 *         description: Пользователь не найден
 */
app.delete('/api/users/:id', (req, res) => {
  const exists = users.some((u) => u.id === req.params.id);
  if (!exists) return res.status(404).json({ error: 'User not found' });
  users = users.filter((u) => u.id !== req.params.id);
  res.status(204).send();
});

// ————— CRUD пользователей (маршруты /users для обратной совместимости) —————

app.get('/users', (req, res) => res.json(users));
app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id || u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(user);
});
app.post('/users', (req, res) => {
  const { name, age } = req.body;
  const newUser = { id: nanoid(6), name: name ?? '', age: Number(age) || 0 };
  users.push(newUser);
  res.status(201).json(newUser);
});
app.patch('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id || u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  const { name, age } = req.body;
  if (name !== undefined) user.name = name;
  if (age !== undefined) user.age = age;
  res.json(user);
});
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id || u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Пользователь не найден' });
  users.splice(index, 1);
  res.status(204).send();
});

// ————— CRUD товаров (практика 2 — задание) —————

// Просмотр всех товаров
app.get('/products', (req, res) => {
  res.json(products);
});

// Просмотр товара по id
app.get('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  res.json(product);
});

// Добавление товара (поля: name, price)
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: Date.now(),
    name: name ?? 'Без названия',
    price: Number(price) || 0,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Редактирование товара по id
app.patch('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  const { name, price } = req.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = Number(price);
  res.json(product);
});

// Удаление товара по id
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  products.splice(index, 1);
  res.status(204).send();
});

// ————— API магазина (практика 4): CRUD для React —————

function findShopProductOr404(id, res) {
  const product = shopProducts.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ error: 'Товар не найден' });
    return null;
  }
  return product;
}

app.get('/api/products', (req, res) => res.json(shopProducts));
app.get('/api/products/:id', (req, res) => {
  const product = findShopProductOr404(req.params.id, res);
  if (!product) return;
  res.json(product);
});
app.post('/api/products', (req, res) => {
  const { name, category, description, price, stock, rating, image } = req.body;
  const newProduct = {
    id: nanoid(6),
    name: (name ?? '').trim() || 'Без названия',
    category: (category ?? '').trim() || 'Без категории',
    description: (description ?? '').trim() || '',
    price: Number(price) || 0,
    stock: Math.max(0, Number(stock) || 0),
    rating: rating != null ? Number(rating) : null,
    image: image ?? '',
  };
  shopProducts.push(newProduct);
  res.status(201).json(newProduct);
});
app.patch('/api/products/:id', (req, res) => {
  const product = findShopProductOr404(req.params.id, res);
  if (!product) return;
  const { name, category, description, price, stock, rating, image } = req.body;
  if (name !== undefined) product.name = (name ?? '').trim() || product.name;
  if (category !== undefined) product.category = (category ?? '').trim() || product.category;
  if (description !== undefined) product.description = (description ?? '').trim();
  if (price !== undefined) product.price = Number(price) ?? product.price;
  if (stock !== undefined) product.stock = Math.max(0, Number(stock) ?? 0);
  if (rating !== undefined) product.rating = rating != null ? Number(rating) : product.rating;
  if (image !== undefined) product.image = image ?? product.image;
  res.json(product);
});
app.delete('/api/products/:id', (req, res) => {
  const exists = shopProducts.some((p) => p.id === req.params.id);
  if (!exists) return res.status(404).json({ error: 'Товар не найден' });
  shopProducts = shopProducts.filter((p) => p.id !== req.params.id);
  res.status(204).send();
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
});
