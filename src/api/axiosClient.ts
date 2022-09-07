import axios from 'axios';
import { ACCESS_TOKEN_KEY, getAccessToken } from 'utils/storage';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosClientAdmin = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClientAdmin.interceptors.request.use((request) => {
  const accessToken = JSON.parse(
    getAccessToken(ACCESS_TOKEN_KEY.ADMIN) as string
  ).accessToken;
  const authorizationString = `Bearer ${accessToken}`;
  request.headers && (request.headers['Authorization'] = authorizationString);
  return request;
});

const axiosClientShipper = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClientShipper.interceptors.request.use((request) => {
  const accessToken = JSON.parse(
    getAccessToken(ACCESS_TOKEN_KEY.SHIPPER) as string
  ).accessToken;
  const authorizationString = `Bearer ${accessToken}`;
  request.headers && (request.headers['Authorization'] = authorizationString);
  return request;
});

export { axiosClient, axiosClientAdmin, axiosClientShipper };
