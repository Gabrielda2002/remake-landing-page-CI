import axios from 'axios';

const baseURL = import.meta.env.PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const api = {
  contact: (data: Record<string, unknown>) => 
    apiClient.post('/research-center/contact', data),
  
  study: (data: Record<string, unknown>) => 
    apiClient.post('/research-center/volunteer', data),
};