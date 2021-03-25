const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // req.headers.authorization.split(' ')[1];
        const verifyUser = await jwt.verify(token, 'secret');
        // console.log(verifyUser._id);

        const user = await User.findOne({ _id: verifyUser._id });
        // console.log(user);

        req.token = token;
        req.user = user;

        next();
    } catch (err) {
        res.status(403).json({
            message: 'Authentication Failed!',
        });
    }
};

module.exports = authenticate;
