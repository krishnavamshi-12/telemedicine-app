const CryptoJS = require("crypto-js");

exports.encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, "secretkey").toString();
};

exports.decrypt = (data) => {
  return CryptoJS.AES.decrypt(data, "secretkey")
    .toString(CryptoJS.enc.Utf8);
};