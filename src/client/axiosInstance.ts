import axios from 'axios';
import { getData } from '../utils/HelperFunctions/index.tsx';

export const basePath = 'https://api.ehsnavigator.com/api';

const Axios = axios.create({
  baseURL: basePath,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { Axios };

const axiosInstance = axios.create({
  baseURL: basePath,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {

    const data = await getData('userData');

    if (!data) return config

    if (data?.accessToken) {
      config.headers.Authorization = `Bearer ${data?.accessToken}`;
    } else {
      console.warn('No access token found in storage');
    }

    return config;
  },
  error => Promise.reject(error),
);


axiosInstance.interceptors.response.use(
  (response) => response?.data,
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
