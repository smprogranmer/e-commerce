// how to use axios in react lke prodution lavel ?
import axios from 'axios'
import { server } from '../constants/config';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const token = getCookie('token');
console.log("🚀 ~ token:", token);
export const myAxios = axios.create({
  baseURL: server,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getCookie('token')}}`,
  },
  timeout: 5000,
  withCredentials: true // Add this line
});
myAxios.interceptors.response.use(response => response, error => {
    // Handle and log errors globally
    console.error('Global error handler:', error);
    return Promise.reject(error);
});