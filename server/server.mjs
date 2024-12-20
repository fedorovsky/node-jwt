import express from 'express';
import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT, errors } from 'jose';
import cors from 'cors';
import morgan from 'morgan';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import {faker} from '@faker-js/faker';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const SECRET_KEY = Buffer.from('your_secret_key', 'utf-8');

// Open the SQLite database
const dbPromise = open({
  filename: 'database.db',
  driver: sqlite3.Database,
});

// Initialize database
const initializeDatabase = async () => {
  const db = await dbPromise;

  // Создаём таблицу, если она не существует
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      username TEXT NOT NULL
    );
  `);

  // Проверяем существование колонки username
  const columns = await db.all(`PRAGMA table_info(users);`);

  const usernameExists = columns.some((column) => column.name === 'username');

  // Если колонки нет, добавляем её
  if (!usernameExists) {
    await db.exec(`
      ALTER TABLE users ADD COLUMN username TEXT NOT NULL DEFAULT '';
    `);
  }
};

// Function to generate a JWT
const generateToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(SECRET_KEY);
};

// Initialize database on server startup
initializeDatabase();

/**
 * Registration
 */
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;

  // Validate email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  const db = await dbPromise;

  try {
    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const username = faker.internet.username();

    // Save the user
    await db.run(
      'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
      [email, hashedPassword, username],
    );

    // Generate JWT
    const token = await generateToken({ email });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

/**
 * Login
 */
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const db = await dbPromise;

  try {
    // Find the user
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = await generateToken({ email: user.email });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

/**
 * Delete all users
 */
app.delete('/auth/delete-all-users', async (req, res) => {
  const db = await dbPromise;

  try {
    await db.run('DELETE FROM users');
    res
      .status(200)
      .json({ message: 'All users have been deleted successfully.' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting users.' });
  }
});

/**
 * Check if email exists
 */
app.post('/auth/check-email', async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  const db = await dbPromise;

  try {
    // Check if email exists in the database
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    if (existingUser) {
      return res
        .status(200)
        .json({ exists: true, message: 'Email is already registered' });
    } else {
      return res
        .status(200)
        .json({ exists: false, message: 'Email is available' });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while checking the email' });
  }
});

/**
 * Middleware for token verification
 */
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication token is missing or invalid.',
    });
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE email = ?', [
      payload.email,
    ]);

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication failed.',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      return res.status(401).json({
        error: 'Token Expired',
        message: 'The authentication token has expired. Please log in again.',
      });
    }
    return res.status(403).json({
      error: 'Unauthorized',
      message: 'Authentication token is invalid.',
    });
  }
};

app.get('/', async (req, res) => {
  const db = await dbPromise;
  const users = await db.all('SELECT id, email FROM users');

  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

/**
 * Protected route
 */
app.get('/protected', authenticateToken, async (req, res) => {
  const db = await dbPromise;
  const users = await db.all('SELECT id, email, username FROM users');

  res.json({
    message: 'This is a protected route',
    users,
  });
});
