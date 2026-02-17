const CryptoJS = require('crypto-js');

let AesUtil = function (keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function (salt, passPhrase) {
  var key = CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
    keySize: this.keySize,
    iterations: this.iterationCount
  });
  return key;
};

AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, passPhrase);
  var encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Hex.parse(iv)
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

let aesUtil = new AesUtil(128, 1000);
let salt = "c61b553d68b21d63aba9285e9ccea96f";
let iv = "9eb09172c6e6a0a63fd381519fccbd47";
let plainText = "password";
let passPhrase = "BijliWeAreMakers";

let ciphertext = aesUtil.encrypt(salt, iv, passPhrase, plainText);
console.log("Resulting ciphertext:", ciphertext);
console.log("Expected ciphertext:  SzeH1mNkhPxEoo6GsjpR+A==");
