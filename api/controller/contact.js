const Contact = require('../models/contact');

const controllers = {};

controllers.getAllContactUsers = async (req, res, next) => {
    try {
        const contact = await Contact.find().sort({ phone: 1 });
        res.status(200).json({ message: 'ALL contactUsers', contact });
    } catch (err) {
        next(err);
    }
};

controllers.postNewContatUsers = async (req, res, next) => {
    try {
        const { name, phone, email } = req.body;

        if (!name || !phone || !email) {
            return res.status(400).json({ message: 'please filup the field property!' });
        }

        const findContact = await Contact.findOne({ email });
        if (findContact) {
            return res.status(422).json({ message: 'email allready exists!' });
        }

        const contact = new Contact({ name, phone, email });
        const contactNewUser = await contact.save();
        res.status(200).json(contactNewUser);
    } catch (err) {
        next(err);
    }
};

controllers.getSingleContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact);
    } catch (err) {
        next(err);
    }
};

controllers.deleteSingleContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: 'user Contact deleted!' });
    } catch (err) {
        next(err);
    }
};

controllers.putSingleContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateContact = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        };
        const update = await Contact.findByIdAndUpdate(id, { $set: updateContact });
        const updateId = await Contact.findById(update._id);
        res.status(200).json(updateId);
    } catch (err) {
        next(err);
    }
};

module.exports = controllers;
