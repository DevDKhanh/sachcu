const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/page', commentController.getCommentOfPage);

module.exports = router;