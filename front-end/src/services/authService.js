import axios from 'axios';

export const login = async (username, password) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
  localStorage.setItem('token', res.data.token);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};
