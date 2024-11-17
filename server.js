const express = require('express');
const bcrypt = require('bcryptjs');
const {jwtVerify, SignJWT} = require('jose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Temporary "user database"
const users = [];

const SECRET_KEY = Buffer.from('your_secret_key', 'utf-8');

// Function to generate JWT
const generateToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setExpirationTime('1h')
    .sign(SECRET_KEY);
};

// Function to verify JWT
const verifyToken = async (token) => {
  const {payload} = await jwtVerify(token, SECRET_KEY);
  return payload;
};

// User registration
app.post('/auth/register', async (req, res) => {
  const {email, password} = req.body;

  console.log('email', email);

  // Check if email is provided and valid
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({message: 'Valid email is required'});
  }

  // Check if a user with the same email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({message: 'User already exists'});
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user
  users.push({email, password: hashedPassword});

  // Generate JWT
  const token = await generateToken({email});

  res.status(201).json({message: 'User registered successfully', token});
});

// User login
app.post('/auth/login', async (req, res) => {
  const {email, password} = req.body;

  // Find the user by email
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({message: 'Invalid credentials'});
  }

  // Check the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({message: 'Invalid credentials'});
  }

  // Generate JWT
  const token = await generateToken({email: user.email});

  res.json({message: 'Login successful', token});
});

// Middleware to verify the token and check if the user exists in the database
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
    const decoded = await verifyToken(token);

    // Check if the user exists in the database
    const user = users.find((user) => user.email === decoded.email);
    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found.',
      });
    }

    // Save the user in req for further use
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
      error: 'Unauthorized',
      message: 'Authentication token is invalid.',
    });
  }
};

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  // Filter user data to remove passwords
  const safeUsers = users.map((user) => ({
    email: user.email, // Return only safe data
  }));

  res.json({
    message: 'This is a protected route',
    users: safeUsers, // Return the list of users
  });
});

app.get('/', (req, res) => {
  // Filter user data to remove passwords
  const safeUsers = users.map((user) => ({
    email: user.email, // Return only safe data
  }));

  res.json(safeUsers);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
