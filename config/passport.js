const winston = require('winston');
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
                
                const user = await ds.createUser({ username, password });

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
                    return done(null, false, { message: 'Usuario no encontrado' });
                }

                const validate = await user.isValidPassword(password);

                if(!validate) {
                    return done(null, false, { message: 'Contraseña incorrecta!' });
                }

                return done(null, user, { message: 'Sesión iniciada' })
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