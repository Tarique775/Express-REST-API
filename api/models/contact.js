const mongoose = require('mongoose');
const validators = require('validator');

const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [3, 'required at least 3 alphabet!'],
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minLength: [11, 'required at least 11 digit!'],
        maxLength: [11, 'not more than 11 digit!'],
    },
    email: {
        type: String,
        trim: true,
        match: [
            /^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$/g,
            'value is not an email!',
        ],
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
