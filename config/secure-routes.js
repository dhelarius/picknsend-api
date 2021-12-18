const express = require('express');
const router = express.Router();
const profile = require('../app/users/profile');

module.exports = (account, ds) => {
    router.get('/profile', profile.user);

    router.put('/account/password', account.isValidPassword, profile.changePassword(ds));

    return router;
}