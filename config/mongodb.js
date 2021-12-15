const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

let User = mongoose.model('User', userSchema);

const createAndSaveUser = (data, done) => {
    const user = new User(data);
  
    /*user.save((err, data) => {
      if (err) return console.error(err);
      done(null , data);
    })*/

    user.save().then(done());
};

module.exports = (db) => {
    mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    return {
        createAndSaveUser
    }
}