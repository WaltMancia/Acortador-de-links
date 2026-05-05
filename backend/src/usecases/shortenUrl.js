const urlService = require('../services/urlService');
const { isValidUrl } = require('../utils/validator');

exports.execute = (url) => {
    if (!url || !isValidUrl(url)) {
        throw new Error('URL inválida');
    }

    const shortCode = urlService.generateShortCode();
    urlService.save(shortCode, url);

    return {
        shortUrl: `http://localhost:3000/${shortCode}`,
    };
};

exports.getOriginalUrl = (code) => {
    const url = urlService.get(code);

    if (!url) {
        throw new Error('URL no encontrada');
    }

    return url;
};