const bcrypt = require('bcrypt');
const winston = require('winston');
const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, ds) => {
    passport.use('signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, async (username, password, done) => {
            try {
                const data = {
                    username,
                    password,
                    type: 'administrator',
                    creationDate: '16/12/2021',
                    active: true
                }
                const user = await ds.createUser(data);

                return done(null, user);
            } catch(error) {
                done(error);
            }
    }));
}