import axios from 'axios';
require("dotenv").config();

export function getUserDetails() {
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/auth`, {
        withCredentials: true,
    });
}

export function logout() {
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/auth/logout`, {
        withCredentials: true,
    });
}

export function login(username, password) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/auth/login`, { username, password }, {
        withCredentials: true,
    })
}

export function formules(tabFormules){
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/sujet/formules`, tabFormules, {
        withCredentials: true,
    })
}

export function getFormules(categorie){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/sujet/categories/${categorie}/formules`, {
        withCredentials: true,
    });
}

export function getCategories(){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/sujet/categories`, {
        withCredentials: true,
    });
}