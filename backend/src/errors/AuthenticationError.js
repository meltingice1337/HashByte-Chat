const HttpError = require('./HttpError');

module.exports = class AuthenticationError extends HttpError {
    constructor() {
        super(403, 'Authentication Error');
    }
}