const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);
router.get('/post', postController.getPost);
router.post('/reviews', postController.postReviews);
router.get('/reviews', postController.getStarReviews);

module.exports = router;
