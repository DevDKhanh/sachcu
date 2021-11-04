const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController');

router.get('/posts', adminController.getPosts);
router.put('/posts/post/active', adminController.updateActivePost);
router.delete('/posts/post', adminController.deletePost);

module.exports = router;
