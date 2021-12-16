const bcrypt = require('bcrypt');

module.exports = (data, ds, res) => {
    bcrypt.hash(`${data.password}${process.env.PLAIN_TEXT_PASSWORD}`, parseInt(process.env.SALT_ROUNDS)).then((hash) => {
        data.password = hash;
        ds.createUser(data, res);
    });
}