require('../config/config');
var CryptoJS = require("crypto-js");

// Encrypt
const encrypt = (text) => {
        const ciphertext = CryptoJS.AES.encrypt(text, KEY).toString();
        return ciphertext
    }
    // Decrypt
const decrypt = (ciphertext) => {
    var bytes = CryptoJS.AES.decrypt(ciphertext, KEY);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}


module.exports = {
    encrypt,
    decrypt
}