const CryptoJS = require("crypto-js");

function comparePwd(pwdClair, pwdCrypted) {
    return pwdClair === CryptoJS.AES.decrypt(pwdCrypted, process.env.CRYPT_SECRET).toString(CryptoJS.enc.Utf8);
}

function encrypt(pwd) {
    return CryptoJS.AES.encrypt(pwd, process.env.CRYPT_SECRET).toString();
}

function generatePwd() {
    const length = Math.random() * 10000 % 5 + 8;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function random(max, min, decimalPlaces) {
    const rand = Math.random() * (max + 1 - min) + min;
    const power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
}

module.exports = { comparePwd, encrypt, generatePwd, random };