const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Temporary "user database"
const users = [];

const SECRET_KEY = 'your_secret_key';

// User registration
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if a user with the same username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

// User login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({ message: 'Login successful', token });
});

// Middleware to verify the token and check if the user exists in the database
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

    // Check if the user exists in the database
    const user = users.find((user) => user.username === decoded.username);
    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found.',
      });
    }

    // Save the user in req for further use
    req.user = user;
    next();
  });
};

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  // Filter user data to remove passwords
  const safeUsers = users.map((user) => ({
    username: user.username, // Return only safe data
  }));

  res.json({
    message: 'This is a protected route',
    users: safeUsers, // Return the list of users
  });
});

app.get('/', (req, res) => {
  // Filter user data to remove passwords
  const safeUsers = users.map((user) => ({
    username: user.username, // Return only safe data
  }));

  res.json(safeUsers);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
