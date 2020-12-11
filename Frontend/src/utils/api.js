import axios from 'axios';

export function getUserDetails() {
    return axios.get('http://localhost:3001/auth', {
        withCredentials: true,
    });
}

export function logout() {
    return axios.get('http://localhost:3001/auth/logout', {
        withCredentials: true,
    });
}

export function login(username, password) {
    return axios.post(`http://localhost:3001/auth/login`, { username, password }, {
        withCredentials: true,
    })
}

export function formules(tabFormules){
    return axios.post(`http://localhost:3001/sujet/formules`, tabFormules, {
        withCredentials: true,
    })
}

export function getFormules(){
    return axios.get('http://localhost:3001/sujet/getFormules', {
        withCredentials: true,
    });
}