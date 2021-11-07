const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/postController');

router.get('/', postController.getPosts);
router.get('/count', postController.countPosts);
router.get('/post', postController.getPost);
router.post('/reviews', postController.postReviews);
router.get('/reviews', postController.getStarReviews);
router.get('/search', postController.searchPost);

module.exports = router;
