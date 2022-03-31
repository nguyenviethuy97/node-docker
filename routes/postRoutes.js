const express = require('express')

const router = express.Router()
const { createPost, deletePost, getAllPosts, getSinglePost, updatePost } = require('../controller/postController')

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').get(getSinglePost).patch(updatePost).delete(deletePost)

module.exports = router