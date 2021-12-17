const { body, validationResult } = require('express-validator');
const users = require('../app/users/index');

module.exports = (app, passport, ds) => {
    app.post('/signup', 
    /*body('username').custom(value => {
        return ds.findUserByUsername(value).then(user => {
            if (user) {
                return Promise.reject('El usuario ya está en uso');
            }
        });
    }),*/
    body('password').isLength({ min: 6 }),
    passport.authenticate('signup', { session: false }),
    users.signup(validationResult));

    app.post('/user/authenticate', users.login(ds));

    app.get('/user/greeting', passport.authenticate('login', { session: false }), (req, res) => {
        res.json({ greeting: 'Hello, Darío Jiménez!' });
    });
}