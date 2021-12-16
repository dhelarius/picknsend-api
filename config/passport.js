const bcrypt = require('bcrypt');
const winston = require('winston');
const BearerStrategy = require('passport-http-bearer');

module.exports = (passport, ds) => {
    passport.use(new BearerStrategy((username, password, cb) => {

    }));
}