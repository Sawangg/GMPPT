import axios from 'axios';

export function getUserDetails() {
    return axios.get('http://localhost:3001/auth', {
        withCredentials: true,
    });
}

export function login(username, password) {
    return axios.put(`http://localhost:3001/auth/login`, { username, password }, {
        withCredentials: true,
    });
}