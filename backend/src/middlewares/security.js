const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP
    message: {
        error: 'Demasiadas solicitudes, intenta nuevamente más tarde'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Validación básica de payload (anti ataques simples)
const sanitizeBody = (req, res, next) => {
    if (req.body && typeof req.body.url === 'string') {
        // Bloquear scripts básicos
        if (/<script>|<\/script>/i.test(req.body.url)) {
            return res.status(400).json({
                error: 'Input malicioso detectado'
            });
        }
    }
    next();
};

module.exports = {
    limiter,
    helmetMiddleware: helmet(),
    sanitizeBody,
};