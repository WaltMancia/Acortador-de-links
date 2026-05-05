const express = require('express');
const cors = require('cors');
const urlController = require('./controllers/urlController');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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