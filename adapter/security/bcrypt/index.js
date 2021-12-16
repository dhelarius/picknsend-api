const bcrypt = require('bcrypt');

const createUser = (data, ds, res) => {
    bcrypt.hash(`${data.password}${process.env.PLAIN_TEXT_PASSWORD}`, parseInt(process.env.SALT_ROUNDS)).then((hash) => {
        data.password = hash;
        ds.createUser(data, res);
    });
}

const decrypt = (password, hash) => bcrypt.compare(`${password}${process.env.PLAIN_TEXT_PASSWORD}`, hash);

/*module.exports = (data, ds, res) => {
    bcrypt.hash(`${data.password}${process.env.PLAIN_TEXT_PASSWORD}`, parseInt(process.env.SALT_ROUNDS)).then((hash) => {
        data.password = hash;
        ds.createUser(data, res);
    });
}*/

module.exports = {
    createUser,
    decrypt
}