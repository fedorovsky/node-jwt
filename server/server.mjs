import express from 'express';
import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT, errors } from 'jose';
import cors from 'cors';
import morgan from 'morgan';
import knex from 'knex';
import { faker } from '@faker-js/faker';
import knexConfig from './knexfile.cjs';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const JWT_SECRET_KEY = Buffer.from('your_secret_key', 'utf-8');

// Initialize knex instance using configuration from knexfile.cjs
const db = knex(knexConfig.development);

// Function to generate a JWT
const generateJwtToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(JWT_SECRET_KEY);
};

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
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    const user = await db('users').where({ email: payload.email }).first();

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

/**
 * Registration
 */
app.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  try {
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = faker.internet.username();

    await db('users').insert({ email, password: hashedPassword, username });

    const token = await generateJwtToken({ email });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

/**
 * Login
 */
app.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = await generateJwtToken({ email: user.email });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

/**
 * Check if email exists
 */
app.post('/auth/check-email', async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  try {
    const existingUser = await db('users').where({ email }).first();

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
    res.status(500).json({ message: 'An error occurred while checking the email' });
  }
});

/**
 * Validate token
 */
app.post('/auth/validate-token', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication token is missing or invalid.',
    });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    const user = await db('users').where({ email: payload.email }).first();

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication failed. User not found.',
      });
    }

    const newToken = await generateJwtToken({ email: payload.email });

    res.status(200).json({
      message: 'Token is valid and has been renewed.',
      token: newToken,
    });
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      return res.status(401).json({
        error: 'Token Expired',
        message: 'The authentication token has expired. Please log in again.',
      });
    }

    console.error(err);
    return res.status(403).json({
      error: 'Unauthorized',
      message: 'Authentication token is invalid.',
    });
  }
});

/**
 * Users - get all
 */
app.get('/users', async (req, res) => {
  try {
    const users = await db('users').select('id', 'email', 'username');
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving users' });
  }
});

/**
 * Users - remove all
 */
app.delete('/users/remove-all', async (req, res) => {
  try {
    await db('users').del();
    res.status(200).json({ message: 'All users have been deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting users.' });
  }
});

/**
 * Users - me
 */
app.get('/users/me', authenticateToken, async (req, res) => {
  try {
    const { id, email, username } = req.user;
    res.status(200).json({ id, email, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving user details.' });
  }
});

/**
 * Protected route
 */
app.get('/protected', authenticateToken, async (req, res) => {
  try {
    const users = await db('users').select('id', 'email', 'username');
    res.json({
      message: 'This is a protected route',
      users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving users.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
