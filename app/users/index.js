const { decrypt } = require('../../adapter/security/crypt/bcrypt');
const { generateAccessToken } = require('../../adapter/security/token/jwt');

module.exports = {
    signUp: (ds, validationResult) => async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await ds.createUser(req.body);
        res.status(200).json({
            message: 'Signup successful',
            user: {
                username: user.username,
                type: user.type,
                creationDate: user.creationDate,
                active: user.active
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