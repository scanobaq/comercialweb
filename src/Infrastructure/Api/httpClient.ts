import axios from 'axios';

// Cliente para peticiones JSON
export const httpClient = axios.create({
  baseURL: ' http://localhost:5275/api/',

  headers: {
    'Content-Type': 'application/json'
  }
});

// Cliente para peticiones FormData
export const formDataClient = axios.create({
  baseURL: 'http://localhost:5048/api/',
  
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
