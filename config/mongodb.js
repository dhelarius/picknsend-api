const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { encrypt, decrypt } = require('../adapter/security/crypt/bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    creationDate: { type: String },
    active: { type: Boolean }
});

userSchema.pre(
    'save',
    async function(next) {
        const user = this;
        const hash = await encrypt(user.password);

        user.password = hash;
        next();
    }
);

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const match = await decrypt(password, user.password);

    return match;
}

let User = mongoose.model('User', userSchema);

const createUser = (data) => {
    const user = new User(data);
    return user.save();
};

const findUserByUsername = (username) => User.findOne({ name: username });

module.exports = (db) => {
    mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    return {
        createUser,
        findUserByUsername
    }
}