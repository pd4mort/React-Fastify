import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Register from '../register/Register';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        password
      });

      const { accessToken } = response.data;

      localStorage.setItem('accessToken', accessToken);

      setEmail('');
      setPassword('');
      navigate('/home');
      window.location.replace('');
    } catch (error) {
      console.log('Error de inicio de sesión:', error);
    }
  };


  const handleBackToLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="login-container">
      {showLoginForm ? (
        <div className="login-form-container">
          <h1 className="login-title">Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="login-input"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="login-input"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <button
              type="button"
              className="register-button"
              onClick={() => setShowLoginForm(false)}
            >
              Register
            </button>
          </form>
        </div>
      ) : (
        <Register onBackToLogin={handleBackToLogin} />
      )}
    </div>
  );
};

export default Login;
