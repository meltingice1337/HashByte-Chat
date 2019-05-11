const HttpError = require('./HttpError');

module.exports = class UserExistent extends HttpError {
    constructor() {
        super(409, 'User Already Existent');
    }
}