const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./dbrender');
const app = express();

// Use the environment's port or default to 3001
const port = process.env.PORT || 3001;

app.use(cors({
    origin: 'https://blog-system-with-authentication-frontend.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));
app.use(bodyParser.json());

const JWT_SECRET = 'wissam'; 

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Register a user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User registered successfully', userId: result.rows[0].id });
  });
});

// Login and return JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = $1';
  db.query(sql, [username], (err, result) => {
    if (err) throw err;
    if (result.rows.length === 0 || !bcrypt.compareSync(password, result.rows[0].password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Get all posts (public)
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) throw err;
    res.json(results.rows);
  });
});

// Get a post by ID (public)
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM posts WHERE id = $1', [id], (err, result) => {
    if (err) throw err;
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  });
});

// Create a post (protected)
app.post('/posts', authenticateToken, (req, res) => {
  const { title, content, author } = req.body;
  const sql = 'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING id';
  db.query(sql, [title, content, author], (err, result) => {
    if (err) throw err;
    res.json({ id: result.rows[0].id, title, content, author });
  });
});

// Update a post (protected)
app.put('/posts/:id', authenticateToken, (req, res) => {
  const { title, content, author } = req.body;
  const id = req.params.id;
  const sql = 'UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4';
  db.query(sql, [title, content, author, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Post updated' });
  });
});

// Delete a post (protected)
app.delete('/posts/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM posts WHERE id = $1', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Post deleted' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
