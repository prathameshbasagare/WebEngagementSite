import axios from 'axios';

// Base API instance
const api = axios.create({
  baseURL: 'https://your-api-url.com/api',
});

// API calls
export const registerUser = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};
