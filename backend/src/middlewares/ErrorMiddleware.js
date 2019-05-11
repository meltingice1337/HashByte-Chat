const HttpError = require('../errors/HttpError');

const ErrorMiddleware = (err, req, res, next) => {
    if (err && err instanceof HttpError) {
        res.status(err.status).send(err.toJson());
    } else {
        res.send('pl')
    }
}

module.exports = ErrorMiddleware;