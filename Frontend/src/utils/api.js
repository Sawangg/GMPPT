import axios from 'axios';

const credentials = { withCredentials: true }
const host = 'localhost';

//User 
export function getInfoUserAPI() {
    return axios.get(`http://${host}:3001/auth`, credentials);
}

export function logoutAPI() {
    return axios.get(`http://${host}:3001/auth/logout`, credentials);
}

export function getImageUserAPI(username) {
    return axios.get(`http://${host}:3001/auth/${username}/profilepic`, credentials)
}

export function loginAPI(username, password) {
    return axios.post(`http://${host}:3001/auth/login`, { username, password }, credentials)
}

export function setImageUserAPI(username, image) {
    return axios.post(`http://${host}:3001/auth/${username}/profilepic/new`, image, credentials)
}

export function setPwdUserAPI(username, passwords) {
    return axios.post(`http://${host}:3001/auth/${username}/changepwd`, { passwords }, credentials)
}

//Formules
export function getCategoriesFormulesAPI(idModele){
    return axios.get(`http://${host}:3001/modele/${idModele}/categories`, credentials)
}

export function addCategorieFormuleAPI(idModele, tabFormules){
    return axios.post(`http://${host}:3001/modele/${idModele}/categories/new`, tabFormules, credentials)
}

//Modele
export function getInfoModeleAPI(idModele){
    return axios.get(`http://${host}:3001/modele/${idModele}`, credentials)
}

export function deleteModeleAPI(idModele){
    return axios.get(`http://${host}:3001/modele/${idModele}/delete`, credentials)
}

export function getAllModeleAPI(){
    return axios.get(`http://${host}:3001/modele`, credentials)
}

//renvoie ausi le numéro modele
export function addModeleAPI(nomModele){
    return axios.post(`http://${host}:3001/modele/new`, {"nommodele" : nomModele}, credentials)
}

//Architectures
export function getInfoArchiAPI(/*archi*/){
    const archi = 0;
    return axios.get(`http://${host}:3001/architecture/${archi}/modeles`, credentials)
}

export function addArchiAPI(archi){
    return axios.post(`http://${host}:3001/architecture/${archi.sujet}/modeles/new`, archi.images, credentials)
}

// //Promotion
export function addPromoAPI(nomPromo){
    return axios.post(`http://${host}:3001/promo/new`, {nomPromo : nomPromo}, credentials)
}

export function getAllPromoAPI(){
    return axios.get(`http://${host}:3001/promo/`, credentials)
}

export function getInfoPromoAPI(idPromo){
    return axios.get(`http://${host}:3001/promo/${idPromo}`, credentials)
}

//Variables aléatoires
export function addVariableAPI(idModele, tabVariables){
    return axios.post(`http://${host}:3001/modele/${idModele}/variables/new`, tabVariables, credentials)
}

export function getVariablesAPI(idModele){
    return axios.get(`http://${host}:3001/modele/${idModele}/variables`, credentials)
}

//Enonces
export function getQuestionsAPI(idModele) {
    return axios.get(`http://${host}:3001/modele/${idModele}/questions`, credentials);
}

export function setQuestionsAPI(idModele, enonce, tabQuestions) {
    return axios.post(`http://${host}:3001/modele/${idModele}/questions/new`, tabQuestions, enonce, credentials);
}

//Unite
export function addUniteAPI(nom, abrev){
    return axios.post(`http://${host}:3001/unite/new`, nom, abrev, credentials);
}

export function getAllUniteAPI(){
    return axios.get(`http://${host}:3001/unite/`, credentials);
}

export function deleteUniteAPI(idUnite){
    return axios.get(`http://${host}:3001/unite/${idUnite}/delete`, credentials);
}