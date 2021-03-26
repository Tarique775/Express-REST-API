const bcrypt = require('bcrypt');
const User = require('../models/user');

const controllers = {};
// mongoose validation error handle
controllers.mongooseErrorFormeter = (e) => {
    const errors = {};
    const allerror = e.substring(e.indexOf(':') + 1).trim();
    const allerrorsInArrayformate = allerror.split(',').map((err) => err.trim());
    allerrorsInArrayformate.forEach((error) => {
        const [key, value] = error.split(':').map((err2) => err2.trim());
        errors[key] = value;
    });
    return errors;
};

controllers.registerController = async (req, res, next) => {
    const { email, password, cpassword } = req.body;
    if (!email || !password || !cpassword) {
        return res.status(400).json({ message: 'please filup the field property!' });
    }
    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(422).json({ message: 'email allready exists!' });
        }
        if (password != cpassword) {
            return res.status(422).json({ message: "password doesn't match!" });
        }

        const user = new User({ email, password, cpassword });

        const newUser = await user.save();
        res.status(200).json({ message: 'user register successfully!', user: newUser });
    } catch (err) {
        // next(err);
        return res.status(500).json({
            message: 'something went wrong',
            case: 'VALIDATION_ERROR',
            debugInfo: controllers.mongooseErrorFormeter(err.message),
        });
    }
};

controllers.getAllUsersController = async (req, res, next) => {
    try {
        const user = await User.find().sort({ email: 1 });
        res.status(200).json({ message: 'get All the Users', user });
    } catch (err) {
        next(err);
    }
};

controllers.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).json({ message: 'fil the field property' });
        }

        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            const token = await user.generatAuthToken();
            res.cookie('jwt', token);
            if (!isMatch) {
                res.status(400).json({ message: 'invalid password!' });
            } else {
                res.status(200).json({ message: 'Login successfully!' });
            }
        } else {
            res.status(404).json({ message: 'Invalid User!' });
    }
    } catch (err) {
        next(err);
    }
};

controllers.postLogOutUser = async (req, res, next) => {
    try {
        // for singleUser logout
        // req.user.tokens = req.user.tokens.filter((element) => element.token != req.token);
        // for allUser logout
        req.user.tokens = [];

        res.clearCookie('jwt');
        await req.user.save();
        res.status(200).json({ message: 'Logout successfully!!' });
    } catch (err) {
        next(err);
    }
};

module.exports = controllers;
