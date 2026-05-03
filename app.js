const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// "Base de datos" en memoria
const urlDatabase = {};

// Generar código corto
function generateShortCode() {
    return crypto.randomBytes(3).toString('hex'); // ej: a1b2c3
}

// Validar URL básica
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Endpoint para acortar URL
app.post('/shorten', (req, res) => {
    const { url } = req.body;

    if (!url || !isValidUrl(url)) {
        return res.status(400).json({ error: 'URL inválida' });
    }

    const shortCode = generateShortCode();

    urlDatabase[shortCode] = url;

    res.json({
        shortUrl: `http://localhost:${PORT}/${shortCode}`
    });
});

// Redirección
app.get('/:code', (req, res) => {
    const { code } = req.params;

    const originalUrl = urlDatabase[code];

    if (!originalUrl) {
        return res.status(404).json({ error: 'URL no encontrada' });
    }

    res.redirect(originalUrl);
});

// Health check (pro)
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
