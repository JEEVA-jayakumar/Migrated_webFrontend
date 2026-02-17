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

AesUtil.prototype.decrypt_raw = function (salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, passPhrase);
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: CryptoJS.enc.Hex.parse(iv)
  });
  return decrypted;
};

let aesUtil = new AesUtil(128, 1000);
let salt_p = "c61b553d68b21d63aba9285e9ccea96f";
let iv_p = "9eb09172c6e6a0a63fd381519fccbd47";
let expected = "SzeH1mNkhPxEoo6GsjpR+A==";
let passPhrase = "BijliWeAreMakers";

console.log("Production Normal:", aesUtil.decrypt_raw(salt_p, iv_p, passPhrase, expected).toString(CryptoJS.enc.Utf8));
console.log("Production Swapped:", aesUtil.decrypt_raw(iv_p, salt_p, passPhrase, expected).toString(CryptoJS.enc.Utf8));
