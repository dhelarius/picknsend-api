const winston = require('winston');
const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const config = require('../config');

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

    passport.use('login', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, async (username, password, done) => {
            try {
                const user = await ds.findUserByUsername(username);

                if(!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if(!validate) {
                    return done(null, false, { message: 'Wrong password!' });
                }

                return done(null, user, { message: 'Logged in Successfully' })
            } catch(error) {
                return done(error);
            }
        }
    ));

    passport.use(
        new JWTstrategy(
            {
                secretOrKey: config.token_secret,
                //jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
            },
            async (token, done) => {
                try {
                    return done(null, token.user);
                } catch(error) {
                    done(error);
                }
            }
        )
    );
}