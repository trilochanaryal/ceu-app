import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL ?? 'https://example.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include tokens if needed
// api.interceptors.request.use(
//   (config) => {
//     const token = 'your-auth-token';
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
