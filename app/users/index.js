const { decrypt } = require('../../adapter/security/crypt/bcrypt');
const { generateAccessToken } = require('../../adapter/security/token/jwt');

module.exports = {
    signup: (validationResult) => async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.status(200).json({
            message: 'Signup successful',
            user: {
                username: req.body.username
            }
        });
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