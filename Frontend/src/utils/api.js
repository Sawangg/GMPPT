import axios from 'axios';

const { host } = window;
const { port } = window;
const credentials = { withCredentials: true };
const protocol = window.location.href.split("/")[0];

// User

export function getInfoUserAPI() {
    return axios.get(`${protocol}//${host}:${port}/auth`, credentials);
}

export function logoutAPI() {
    return axios.get(`${protocol}//${host}:${port}/auth/logout`, credentials);
}

export function getImageUserAPI(username) {
    return axios.get(`${protocol}//${host}:${port}/auth/${username}/profilepic`, credentials);
}

export function loginAPI(username, password) {
    return axios.post(`${protocol}//${host}:${port}/auth/login`, { username, password }, credentials);
}

export function setImageUserAPI(username, image) {
    return axios.post(`${protocol}//${host}:${port}/auth/${username}/profilepic/new`, image, credentials);
}

export function setPwdUserAPI(username, passwords) {
    return axios.post(`${protocol}//${host}:${port}/auth/${username}/changepwd`, { passwords }, credentials);
}

// Formules

export function getCategoriesFormulesAPI(idModele) {
    return axios.get(`${protocol}//${host}:${port}/modele/${idModele}/categories`, credentials);
}

export function addCategorieFormuleAPI(idModele, tabFormules) {
    return axios.post(`${protocol}//${host}:${port}/modele/${idModele}/categories/new`, tabFormules, credentials);
}

// Modele

export function getInfoModeleAPI(idModele) {
    return axios.get(`${protocol}//${host}:${port}/modele/${idModele}`, credentials);
}

export function deleteModeleAPI(idModele) {
    return axios.get(`${protocol}//${host}:${port}/modele/${idModele}/delete`, credentials);
}

export function getAllModeleAPI() {
    return axios.get(`${protocol}//${host}:${port}/modele`, credentials);
}

// renvoie ausi le numéro modele

export function addModeleAPI(nomModele) {
    return axios.post(`${protocol}//${host}:${port}/modele/new`, { "nommodele" : nomModele }, credentials);
}

// Modeles 3D

export function getModele3DAPI(idAuth) {
    return axios.get(`${protocol}//${host}:${port}/etudiant/${idAuth}/modeles`, credentials);
}

export function addModele3DAPI(archi) {
    return axios.post(`${protocol}//${host}:${port}/architecture/${archi.sujet}/modeles/new`, archi.images, credentials);
}

// Architectures

export function addArchiAPI(excel) {
    return axios.post(`${protocol}//${host}:${port}/architecture/new`, excel, credentials);
}

export function getVariablesArchiAPI() {
    return axios.get(`${protocol}//${host}:${port}/architecture/attribued_without_modeles/excel`, credentials);
}

// Promotion

export function addPromoAPI(nomPromo) {
    return axios.post(`${protocol}//${host}:${port}/promo/new`, { nomPromo : nomPromo }, credentials);
}

export function getAllPromoAPI() {
    return axios.get(`${protocol}//${host}:${port}/promo/`, credentials);
}

export function getInfoPromoAPI(idPromo) {
    return axios.get(`${protocol}//${host}:${port}/promo/${idPromo}`, credentials);
}

export function attributionSujetAPI(idPromo, idModele) {
    return axios.get(`${protocol}//${host}:${port}/promo/${idPromo}/${idModele}/attribution`, credentials);
}

export function deletePromoAPI(idPromo){
    return axios.get(`${protocol}//${host}:${port}/promo/${idPromo}/delete`, credentials);
}

export function desatributionSujetAPI(idPromo) {
    return axios.get(`${protocol}//${host}:${port}/promo/${idPromo}/desatribution`, credentials);
}

export function getModelPromoAPI() {
    return axios.get(`${protocol}//${host}:${port}/promo/modele`, credentials);
}

// Variables aléatoires

export function addVariableAPI(idModele, tabVariables) {
    return axios.post(`${protocol}//${host}:${port}/modele/${idModele}/variables/new`, tabVariables, credentials);
}

export function getVariablesAPI(idModele) {
    return axios.get(`${protocol}//${host}:${port}/modele/${idModele}/variables`, credentials);
}

// Enonces

export function setQuestionsAPI(idModele, enonce, tabQuestions) {
    return axios.post(`${protocol}//${host}:${port}/modele/${idModele}/questions/new`, { tabQuestions, enonce }, credentials);
}

export function addUniteAPI(tabUnites) {
    return axios.post(`${protocol}//${host}:${port}/unite/new`, { tabUnites }, credentials);
}

export function getAllUniteAPI() {
    return axios.get(`${protocol}//${host}:${port}/unite/`, credentials);
}

// Etudiant 

export function etudiantNewAPI(idPromo, fileUploaded) {
    return axios.post(`${protocol}//${host}:${port}/etudiant/${idPromo}/new`, fileUploaded, credentials);
}

export function etudiantReponsesNewAPI(tabQuestions) {
    return axios.post(`${protocol}//${host}:${port}/etudiant/reponses/new`, { tabQuestions }, credentials);
}

export function etudiantVariablesAPI(idAuth) {
    return axios.get(`${protocol}//${host}:${port}/etudiant/${idAuth}/variables`, credentials);
}

// Sujet 

export function getSujetAPI(idModele) {
    return axios.get(`${protocol}//${host}:${port}/modele/${idModele}/sujet`, credentials);
}

//Correction

export function getReponsesCorrigees(idPromo, idAuth) {
    return axios.get(`${protocol}//${host}:${port}/correction/${idPromo}/${idAuth}`, credentials);
}

export function getEssaisEtudiant(idAuth){
    return axios.get(`${protocol}//${host}:${port}/etudiant/${idAuth}/reponses`, credentials);
}
