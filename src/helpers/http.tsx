// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const UrlBackEnd = 'http://127.0.0.1:8000/api';
const http = () => {
  const headers = {};

  return axios.create({
    headers,
    baseURL: UrlBackEnd,
  });
};

export default http;
