/**
 * @desc 加密方法
 */

const CryptoJS = require('crypto-js');

const CryptoJSKey = CryptoJS.enc.Utf8.parse('xizh199710052020');
const CryptoJSKeyIV = CryptoJS.enc.Utf8.parse('2020xizh19971005');
const CryptoJSKeyMode = {
    iv: CryptoJSKeyIV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
}

const encode = (word, type = 1) => {
    if(type === 1) {
        return CryptoJS.AES.encrypt(word, CryptoJSKey, CryptoJSKeyMode).toString();
    }
}

const decode = (word, type = 1) => {
    if(type === 1) {
        return CryptoJS.AES.decrypt(word, CryptoJSKey, CryptoJSKeyMode).toString(CryptoJS.enc.Utf8);
    }
}

module.exports = {
    encode,
    decode
}