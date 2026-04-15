import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/Auth/login', { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');

export const getRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
};

export const isAuthenticated = () => !!localStorage.getItem('token');