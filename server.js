const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Временная "база данных" пользователей
const users = [];

const SECRET_KEY = 'your_secret_key';

// Регистрация пользователя
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  // Проверим, есть ли уже пользователь с таким именем
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Хэшируем пароль перед сохранением
  const hashedPassword = await bcrypt.hash(password, 10);

  // Сохраним пользователя
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

// Логин пользователя
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  // Ищем пользователя по имени
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Проверим пароль
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Генерируем JWT
  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({ message: 'Login successful', token });
});

// Миддлвар для проверки токена и существования пользователя в базе
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication token is missing or invalid.',
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: 'Unauthorized',
        message: 'Authentication token is invalid.',
      });
    }

    // Проверяем, существует ли пользователь в базе данных
    const user = users.find((user) => user.username === decoded.username);
    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found.',
      });
    }

    // Сохраняем пользователя в req, чтобы использовать дальше
    req.user = user;
    next();
  });
};

// Защищённый маршрут
app.get('/protected', authenticateToken, (req, res) => {
  // Фильтруем данные пользователей, чтобы убрать пароли
  const safeUsers = users.map((user) => ({
    username: user.username, // Возвращаем только безопасные данные
  }));

  res.json({
    message: 'This is a protected route',
    users: safeUsers, // Возвращаем список пользователей
  });
});

app.get('/', (req, res) => {
  // Фильтруем данные пользователей, чтобы убрать пароли
  const safeUsers = users.map((user) => ({
    username: user.username, // Возвращаем только безопасные данные
  }));

  res.json(safeUsers);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
