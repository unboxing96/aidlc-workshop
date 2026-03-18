import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken && config.url?.startsWith('/admin')) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  const tableToken = localStorage.getItem('tableToken');
  if (tableToken) {
    config.headers['X-Table-Token'] = tableToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAdmin = error.config?.url?.startsWith('/admin');
      if (isAdmin) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
