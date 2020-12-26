import axios from 'axios';
require("dotenv").config();

const credentials = {withCredentials: true}

//User 
export function getInfoUserAPI() {
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/auth`, credentials);
}

export function logoutAPI() {
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/auth/logout`, credentials);
}

export function getImageUserAPI(username) {
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/auth/${username}/profilepic`, credentials)
}

export function loginAPI(username, password) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/auth/login`, { username, password }, credentials)
}

export function setImageUserAPI(username, image) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/auth/${username}/profilepic/new`, image, credentials)
}

export function setPwdUserAPI(username, newPassword) {
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/auth/${username}/changepwd`, { 'newPassword' : newPassword }, credentials)
}

//Formules
export function getCategoriesFormulesAPI(idModele){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}/categories`, credentials)
}

export function addCategorieFormuleAPI(idModele, tabFormules){
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}/categories/new`, tabFormules, credentials)
}

//Modele
export function getInfoModeleAPI(idModele){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}`, credentials)
}

export function deleteModeleAPI(idModele){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}/delete`, credentials)
}

export function getAllModeleAPI(){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/modele`, credentials)
}

//renvoie ausi le numéro modele
export function addModeleAPI(nomModele){
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/modele/new`, {"nommodele" : nomModele}, credentials)
}

//Architectures
export function getInfoArchiAPI(/*archi*/){
    const archi = 0;
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/architecture/${archi}/modeles`, credentials)
}

export function addArchiAPI(archi){
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/architecture/${archi.sujet}/modeles/new`, archi.images, credentials)
}

//Variables aléatoires
export function addVariableAPI(idModele, tabVariables){
    console.log(tabVariables)
    return axios.post(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}/variables/new`, tabVariables, credentials)
}

export function getVariablesAPI(idModele){
    return axios.get(`http://${process.env.REACT_APP_SERVER}:3001/modele/${idModele}/variables`, credentials)
}