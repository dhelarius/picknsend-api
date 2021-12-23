const { body, validationResult } = require('express-validator');
const express = require('express');
const users = require('../app/users/index');

const router = express.Router();

module.exports = (app, passport, ds) => {

    router.post('/signup', 
    body('username').custom(value => {
        return ds.findUserByUsername(value).then(user => {
            if (user) {
                return Promise.reject('El usuario ya está en uso');
            }
        });
    }),
    body('password').isLength({ min: 8 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    },
    passport.authenticate('signup', { session: false }),
    users.signup);

    router.post('/login', passport.authenticate('login', { session: false }), users.login(passport));

    router.get('/logout', users.logout);

    return router;
}