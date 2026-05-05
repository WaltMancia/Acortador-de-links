const crypto = require('crypto');

const urlDatabase = {};

exports.generateShortCode = () => {
    return crypto.randomBytes(3).toString('hex');
};

exports.save = (code, url) => {
    urlDatabase[code] = url;
};

exports.get = (code) => {
    return urlDatabase[code];
};