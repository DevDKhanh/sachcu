const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController');

router.get('/users', adminController.getUsers);
router.delete('/users/user', adminController.deleteUser);
router.get('/posts', adminController.getPosts);
router.get('/posts/censorship', adminController.getPostsCensorship);
router.put('/posts/post/active', adminController.updateActivePost);
router.delete('/posts/post', adminController.deletePost);
router.put('/posts/post/accpet', adminController.accpetPost);

module.exports = router;
