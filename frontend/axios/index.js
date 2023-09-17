// ✨ implement axiosWithAuth

import axios from 'axios';

export const axiosWithAuth =() => {
    const authToken = localStorage.getItem('token');

    const authenticatedAxios = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
          Authorization: authToken,
        },
    });
    return authenticatedAxios;
};

