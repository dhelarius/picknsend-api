module.exports = (ds) => {
    return {
        isValidPassword: async (req, res, next) => {
            const user = await ds.findUserByUsername(req.user.username);

            if(!user) return res.json({ message: 'Usuario no encontrado!' }).status(401);

            const validate = await user.isValidPassword(req.body.password);

            if(!validate) return res.json({ message: 'Contraseña incorrecta!' }).status(401);
            
            next();
        }
    }
}