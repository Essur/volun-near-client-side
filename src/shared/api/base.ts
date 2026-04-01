import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const csrfToken = getCookie('XSRF-TOKEN');

  if (csrfToken && config.headers) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});