const { generateAccessToken } = require('../../adapter/security/token/jwt');

module.exports = {
    signup:  async (req, res, next) => {
        res.status(200).json({
            message: 'Signup successful',
            user: req.user
        });
    },

    login: (passport) => async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');
            
                        return next(error);
                    }
            
                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);
            
                            const body = { _id: user._id, username: user.username };
                            const token = generateAccessToken(body);
                          
                            return res.json({ token });
                        }
                    );
                } catch(error) {
                    return next(error);
                }
            }
        )(req, res, next);
    },

    logout: (req, res, next) => {
        req.session.destroy((err) => {
            if(err) return next(err);

            req.logout();

            res.sendStatus(200);
        });
    }
}