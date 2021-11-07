const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/current-user', authController.currentUser);
router.get('/verifyMail', authController.verifyMail);
router.post('/sendMail', authController.sendMailVerify);

module.exports = router;
