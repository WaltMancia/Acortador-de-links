const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const urlDatabase = {};

function generateShortCode() {
    return crypto.randomBytes(3).toString('hex');
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

app.post('/shorten', (req, res) => {
    const { url } = req.body;

    if (!url || !isValidUrl(url)) {
        return res.status(400).json({ error: 'URL inválida' });
    }

    const shortCode = generateShortCode();
    urlDatabase[shortCode] = url;

    res.json({
        shortUrl: `http://localhost:${PORT}/${shortCode}`,
    });
});

app.get('/:code', (req, res) => {
    const { code } = req.params;

    const originalUrl = urlDatabase[code];

    if (!originalUrl) {
        return res.status(404).json({ error: 'URL no encontrada' });
    }

    res.redirect(originalUrl);
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});