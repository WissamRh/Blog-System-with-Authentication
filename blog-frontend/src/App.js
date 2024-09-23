import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import CreateEditPostPage from './pages/CreateEditPostPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';  
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // Initialize token from localStorage

  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage token={token} setToken={setToken} />} />
        <Route 
          path="/posts/:id" 
          element={<PostDetailsPage token={token} />} // Pass token to PostDetailsPage
        />
        <Route 
          path="/create-edit/:id?" 
          element={
            <ProtectedRoute token={token}>
              <CreateEditPostPage token={token} />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
