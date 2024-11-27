import express from 'express';
import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT, errors } from 'jose';
import cors from 'cors';
import morgan from 'morgan';
import { JSONFilePreset } from 'lowdb/node';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Initialize the database with initial data
const db = await JSONFilePreset('db.json', { users: [] });

const SECRET_KEY = Buffer.from('your_secret_key', 'utf-8');

// Function to generate a JWT
const generateToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(SECRET_KEY);
};

/**
 * Registration
 */
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;

  // Validate email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  // Check if user already exists
  const existingUser = db.data.users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user
  db.data.users.push({ email, password: hashedPassword });
  await db.write();

  // Generate JWT
  const token = await generateToken({ email });

  res.status(201).json({ message: 'User registered successfully', token });
});

/**
 * Login
 */
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = db.data.users.find((user) => user.email === email);
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
    const user = db.data.users.find((user) => user.email === payload.email);

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

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  const safeUsers = db.data.users.map((user) => ({
    email: user.email,
  }));

  res.json({
    message: 'This is a protected route',
    users: safeUsers,
  });
});

app.get('/', (req, res) => {
  const safeUsers = db.data.users.map((user) => ({
    email: user.email,
  }));

  res.json(safeUsers);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
