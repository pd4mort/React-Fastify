import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Register from '../register/Register';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   * Login
   * @param e 
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        password
      });

      const { accessToken } = response.data;

      // Save token in local storage
      localStorage.setItem('accessToken', accessToken);

      // clean email and pass
      setEmail('');
      setPassword('');

      // not see login form
      setShowLoginForm(false);
      window.location.href = ' /Home ';
      window.location.reload();
    } catch (error) {
      console.log('Error de inicio de sesión:', error);
    }
  };

  const handleBackToLogin = () => {
    setShowLoginForm(true);
  };

  /**
   * HTML
   */
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
