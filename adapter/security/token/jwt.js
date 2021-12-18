const jwt = require('jsonwebtoken');
const config = require('../../../config');

function generateAccessToken(user) {
    return jwt.sign({ user }, config.token_secret, { expiresIn: '1800s' });
}

module.exports = {
    generateAccessToken
}