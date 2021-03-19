const express = require('express');
const contactController = require('../controller/contact');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', contactController.getAllContactUsers);

router.post('/', authenticate, contactController.postNewContatUsers);

router.get('/:id', contactController.getSingleContact);

router.put('/:id', authenticate, contactController.putSingleContact);

router.delete('/:id', authenticate, contactController.deleteSingleContact);

module.exports = router;
