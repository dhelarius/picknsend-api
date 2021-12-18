const bcrypt = require('bcrypt');

const encrypt = (password) => bcrypt.hash(`${password}${process.env.PLAIN_TEXT_PASSWORD}`, parseInt(process.env.SALT_ROUNDS));

const decrypt = (password, hash) => bcrypt.compare(`${password}${process.env.PLAIN_TEXT_PASSWORD}`, hash);

module.exports = {
    encrypt,
    decrypt
}