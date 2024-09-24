import axios from 'axios';

export const login = async (username, password) => {
  const response = await axios.post('/api/auth/login', { username, password });
  localStorage.setItem('token', response.data.token);
};

export const register = async (username, password) => {
  const response = await axios.post('/api/auth/register', { username, password });
  localStorage.setItem('token', response.data.token);
};

export const getToken = () => localStorage.getItem('token');
