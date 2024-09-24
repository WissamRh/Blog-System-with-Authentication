import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Login.css";

const LoginPage = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blog-system-with-authentication.onrender.com/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token); // Pass token to App.js
      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to register page
  };

  const handleExplorePosts = () => {
    navigate('/'); // Redirect to posts/homepage
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          <div>
          Don't have an account?{' '}
          </div>
          <button type="button" onClick={handleRegisterRedirect}>
            Register
          </button>
        </p>
        <p>
          <button type="button" onClick={handleExplorePosts}>
            Go to Posts
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
