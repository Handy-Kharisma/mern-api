const express = require('express');
const {body} =  require('express-validator');
const router = express.Router();


const blogController = require('../controllers/blog');
const { route } = require('./auth');

// [POST] : /v1/blog/post
router.post('/post', [
    body('title').isLength({min: 5}).withMessage('Input Title Tidak Sesuai'),
    body('body').isLength({min: 5}).withMessage('Input Body Tidak Sesuai')],
    blogController.createBlogPost);


router.get('/posts', blogController.getAllBlogPost);
// router.get('/posts?page=1&perPage=4', blogController.getAllBlogPost);
router.get('/post/:postId', blogController.getBlogPostById);
router.put('/post/:postId', [
    body('title').isLength({min: 5}).withMessage('Input Title Tidak Sesuai'),
    body('body').isLength({min: 5}).withMessage('Input Body Tidak Sesuai')],
    blogController.updateBlogPost);

router.delete('/post/:postId', blogController.deleteBlogPost);

module.exports = router;