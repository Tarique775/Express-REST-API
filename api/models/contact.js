const mongoose = require('mongoose');
const validators = require('validator');

const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => validators.isEmail(v),
            message: '[value] is not an email',
        },
    },
});

const contact = mongoose.model('contact', ContactSchema);

module.exports = contact;
