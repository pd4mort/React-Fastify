import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';

const App: React.FC = () => {
  const handleBackToLogin = () => {
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={<Register onBackToLogin={handleBackToLogin} />}
      />
    </Routes>
  );
};

export default App;
