const mongoose = require('mongoose');
const validators = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                if (v) {
                    return validators.isEmail(v);
                }
                throw new Error('[value] is not an email!');
            },
        },
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 7,
    },
    cpassword: {
        type: String,
        trim: true,
        required: true,
        minLength: 7,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

userSchema.methods.generatAuthToken = async function (next) {
    try {
        const token = await jwt.sign({ _id: this._id }, 'secret');
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        next(err);
    }
};

const user = mongoose.model('user', userSchema);

module.exports = user;
