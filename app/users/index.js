const signUp = require('../../adapter/security/bcrypt/index')

module.exports = {
    signUp: (ds, validationResult) => (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        signUp(req.body, ds, res);
    }
}