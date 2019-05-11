const HttpError = require('./HttpError');

module.exports = class InvalidBodyError extends HttpError {
    constructor() {
        super(422, 'Invalid Params');
    }
}