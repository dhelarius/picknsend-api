const bcrypt = require('bcrypt');
const winston = require('winston');
const BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = (passport, ds) => {
    passport.use('login', new BearerStrategy((token, done) => {
        //ds.findUser('djimenez');
    }));
}