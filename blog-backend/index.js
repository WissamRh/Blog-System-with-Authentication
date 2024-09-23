const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;
const db = require('./db');

app.use(cors());
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
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User registered successfully' });
  });
});

// Login and return JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, result) => {
    if (err) throw err;
    if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {
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
    res.json(results);
  });
});

// Get a post by ID (public)
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM posts WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  });
});

// Create a post (protected)
app.post('/posts', authenticateToken, (req, res) => {
  const { title, content, author } = req.body;
  const sql = 'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)';
  db.query(sql, [title, content, author], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title, content, author });
  });
});

// Update a post (protected)
app.put('/posts/:id', authenticateToken, (req, res) => {
  const { title, content, author } = req.body;
  const id = req.params.id;
  const sql = 'UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?';
  db.query(sql, [title, content, author, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Post updated' });
  });
});

// Delete a post (protected)
app.delete('/posts/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Post deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
