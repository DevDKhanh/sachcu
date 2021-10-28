const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/post', postController.getPost);

module.exports = router;
