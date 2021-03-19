const express = require('express');
const userController = require('../controller/user');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, userController.getAllUsersController);

router.post('/login', userController.loginController);

router.post('/register', userController.registerController);

module.exports = router;
