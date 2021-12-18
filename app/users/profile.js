module.exports = {
    user: (req, res, next) => {
        res.json({
            message: 'Usuario obtenido a travéz de una ruta segura',
            user: req.user,
        })
    },

    changePassword: (ds) => async (req, res) => {
        const user = await ds.findUserByUsername(req.user.username); 

        if (!user) res.json({ message: 'Usuario no encontrado!' }).status(404); 

        const newPassword = await user.encryptPassword(req.body.newPassword);

        const changed = await ds.changePassword(newPassword);

        if (!changed) res.json({ message: 'La contraseña no ha podido ser modificada!' }).status(304);
        
        res.json({
            message: 'La contraseña ha sido modificada satisfactoriamente!',
            changed
        }).status(204);
    }
}