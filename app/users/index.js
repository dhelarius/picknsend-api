const { createUser, decrypt } = require('../../adapter/security/bcrypt/index');
const { generateAccessToken } = require('../../adapter/security/jwt/index');

module.exports = {
    signUp: (ds, validationResult) => (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        createUser(req.body, ds, res);
    },

    login: (ds) => async (req, res) => {
        const { username, password } = req.body;

        const user = await ds.findUserByUsername(username);
        const match  = await decrypt(password, user[0].password);

        const token = generateAccessToken(username);

        if (match) {
            res.json({ token: token });
        }
    } 
}