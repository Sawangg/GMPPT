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

export function setLogin(username, password) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/auth/login`, { username, password }, {
        withCredentials: true,
    })
}

export function formules(tabFormules){
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/sujet/categories/new/0`, tabFormules, {
        withCredentials: true,
    })
}

export function getFormules(){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/sujet/categories/0`, {
        withCredentials: true,
    });
}

export function changePwd(username, password) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/auth/changepwd/${username}`, { 'newPassword' : password }, {
        withCredentials: true,
    });
}

export function addModeles(modele, numSujet) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/sujet/modeles/new`, {"modele" : modele, "numSujet" : numSujet} , {
        withCredentials: true,
    })
}