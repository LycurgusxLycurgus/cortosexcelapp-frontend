import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://cortosexcelapp-backend.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post('/users', { username, password });
  return response.data;
};

export const googleSignIn = async () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const createTopic = async (content: string, token: string) => {
  const response = await api.post('/topics', { content }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getTopics = async (token: string) => {
  const response = await api.get('/topics', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default api;