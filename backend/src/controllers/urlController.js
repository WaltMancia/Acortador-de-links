const shortenUrlUseCase = require('../usecases/shortenUrl');

exports.shorten = (req, res) => {
    try {
        const result = shortenUrlUseCase.execute(req.body.url);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.redirect = (req, res) => {
    try {
        const result = shortenUrlUseCase.getOriginalUrl(req.params.code);
        res.redirect(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};