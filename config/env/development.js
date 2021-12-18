module.exports = {
    db: {
        mongoUri: process.env.MONGO_URI
    },
    session_secret: process.env.SESSION_SECRET,
    token_secret: process.env.TOKEN_SECRET
}