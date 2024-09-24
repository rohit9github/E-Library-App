import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      alert('Registered successfully');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
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
        onClick={handleRegister} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Register
      </button>
    </div>
  );
}

export default RegisterForm;
