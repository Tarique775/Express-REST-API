const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const controllers = {};

controllers.registerController = async (req, res, next) => {
    try {
        await bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                res.status(500).json({
                    error: err,
                });
            }
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            const newUser = await user.save();
            res.status(200).json({ message: 'user register successfully!', user: newUser });
        });
    } catch (err) {
        next(err);
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
        const { email } = req.body;
        const { password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            await bcrypt.compare(password, user.password, async (err, result) => {
                if (err) {
                    res.json({
                        error: 'Error Occured!',
                    });
                }
                if (result) {
                    const token = await jwt.sign({ email: user.email, _id: user._id }, 'secret', {
                        expiresIn: '2h',
                    });
                    res.status(200).json({
                        message: 'Login Successfull!',
                        token,
                    });
                } else {
                    res.status(500).json({
                        message: "Login Failed! Password doesn't match!",
                    });
                }
      });
        } else {
            res.status(404).json({
                message: 'User Not Found!',
            });
    }
    } catch (err) {
        next(err);
    }
};

module.exports = controllers;
