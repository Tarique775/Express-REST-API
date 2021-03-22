const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // req.headers.authorization.split(' ')[1];
        await jwt.verify(token, 'secret');
        // req.user = decode;
        // conlose.log(decode);
        next();
    } catch (err) {
        res.json({
            message: 'Authentication Failed!',
        });
    }
};

module.exports = authenticate;
