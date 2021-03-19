const mongoose = require('mongoose');
const validators = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => validators.isEmail(v),
            message: '[value] is not an email!',
        },
    },
    password: String,
});

const user = mongoose.model('user', userSchema);

module.exports = user;
