import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/books');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 className="text-xl font-semibold mb-4">Login</h1>
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        placeholder="Username" 
        className="border border-gray-300 p-2 mb-4 w-full rounded" 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="border border-gray-300 p-2 mb-4 w-full rounded" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Login
      </button>
    </form>
  </div>
  );
}

export default LoginForm;
