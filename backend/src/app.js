const express = require('express');
const cors = require('cors');
const urlController = require('./controllers/urlController');

const {
    limiter,
    helmetMiddleware,
    sanitizeBody
} = require('./middlewares/security');

const app = express();
const PORT = 3000;

// Seguridad
app.use(helmetMiddleware);
app.use(limiter);

// CORS (puedes restringirlo luego)
app.use(cors());

// Body parser
app.use(express.json());

// Sanitización básica
app.use(sanitizeBody);

// Routes
app.post('/shorten', urlController.shorten);
app.get('/:code', urlController.redirect);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});