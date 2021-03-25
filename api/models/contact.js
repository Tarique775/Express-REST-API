const mongoose = require('mongoose');
const validators = require('validator');

const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 3,
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
            validator: (v) => {
                if (v) {
                    return validators.isEmail(v);
                }
                throw new Error('[value] is not an email!');
            },
        },
    },
});

const contact = mongoose.model('contact', ContactSchema);

module.exports = contact;
