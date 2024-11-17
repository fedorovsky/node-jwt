const express = require('express');
const bcrypt = require('bcryptjs');
const { jwtVerify, SignJWT } = require('jose');
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
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(SECRET_KEY);
};

/**
 * Registration
 */
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if email is provided and valid
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  // Check if a user with the same email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user
  users.push({ email, password: hashedPassword });

  // Generate JWT
  const token = await generateToken({ email });

  res.status(201).json({ message: 'User registered successfully', token });
});

/**
 * Login
 */
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = await generateToken({ email: user.email });

  res.json({ message: 'Login successful', token });
});

/**
 * Middleware to verify the token and check if the user exists in the database.
 * Handles token authentication for incoming requests.
 */
const authenticateToken = async (req, res, next) => {
  // Retrieve the 'Authorization' header from the request.
  const authHeader = req.headers['authorization'];

  // Extract the token from the 'Authorization' header.
  // The token is usually in the format "Bearer <token>", so we split by a space and take the second part.
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found, return a 401 Unauthorized response with an error message.
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized', // Error type
      message: 'Authentication token is missing or invalid.', // Explanation for the client
    });
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    // Simulate checking if the user exists in the database.
    // This example assumes `users` is an array of user objects, and we search for a match by email.
    const user = users.find((user) => user.email === payload.email);

    // If no user is found, return a 404 Not Found response with an appropriate error message.
    if (!user) {
      return res.status(404).json({
        error: 'Not Found', // Error type
        message: 'User not found.', // Explanation for the client
      });
    }

    // If the user is found, attach the user object to the `req` object for use in subsequent middleware/routes.
    req.user = user;

    // Call the `next` function to pass control to the next middleware or route handler.
    next();
  } catch (err) {
    // If an error occurs during token verification, return a 403 Forbidden response.
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
