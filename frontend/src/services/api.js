import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Interceptor to add JWT token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);
export const addProduct = (formData) => api.post('/products', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const processPayment = (amount) => api.post('/payment', { amount });
