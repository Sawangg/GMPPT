import axios from 'axios';
require("dotenv").config();

const credentials = {withCredentials: true}

//User 
export function getInfoUser() {
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/auth`, credentials);
}

export function logout() {
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/auth/logout`, credentials);
}

export function getImageUser(username) {
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/auth/${username}/profilepic`, credentials)
}

export function login(username, password) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/auth/login`, { username, password }, credentials)
}

export function setImageUser(username, image) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/auth/${username}/profilepic/new`, image, credentials)
}

export function setPwdUser(username, newPassword) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/auth/${username}/changepwd`, { 'newPassword' : newPassword }, credentials)
}

//Formules
export function getCategoriesFormules(idModele){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}/categories`, credentials)
}

export function addCategorieFormule(idModele, tabFormules){
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}/categories/new`, tabFormules, credentials)
}

//Modele
export function getInfoModele(idModele){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}`, credentials)
}

export function deleteModele(idModele){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}/delete`, credentials)
}

export function getAllModele(){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/modele`, credentials)
}

//renvoie ausi le numéro modele
export function addModele(nomModele){
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/modele/new`, {"nommodele" : nomModele}, credentials)
}

//Architectures
export function getInfoArchi(/*archi*/){
    const archi = 0;
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/architecture/${archi}/modeles`, credentials)
}

export function addArchi(/*archi*/){
    const archi = 0;
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/architecture/${archi}/modeles/new`, credentials)
}