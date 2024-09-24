import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Register.css";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://blog-system-with-authentication.onrender.com/register', { username, password });
      alert('User registered successfully');
      navigate('/login'); // Redirect to login after registration
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="register-page">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
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
        <button type="submit">Register</button>
        <p>
        Already have an account?{' '}
        <button type="button" onClick={handleLoginRedirect}>
          Login
        </button>
      </p>
      </form>
    </div>
  );
};

export default RegisterPage;
