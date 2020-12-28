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

module.exports = { comparePwd, encrypt, generatePwd };