import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

interface RegisterProps {
  onBackToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   * Register user in api
   * @param e 
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users', {
        email,
        name,
        password
      });

      console.log('Usuario creado:', response.data);

      // Go to Login when is register
      window.location.href = '/Login';
    } catch (error) {
      console.log('Error al crear el usuario:', error);
      setError('Error al crear el usuario');
    }
  };

  /**
   * HTML
   */
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-header">Register</h1>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="register-input"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="register-input"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="register-input"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <button className="back-to-login-button" onClick={onBackToLogin}>
        Back to Login
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Register;
