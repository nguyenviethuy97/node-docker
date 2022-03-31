const Post = require('../models/postModel')

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: 'Success',
            results: posts.length,
            data: { ...posts }
        })
    } catch (error) {
        res.status(400).json({ status: 'fail' })
    }
}

const getSinglePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            data: { post }
        })
    } catch (error) {
        res.status(400).json({ status: 'fail' })
    }
}

const createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).json({
            status: 'Success',
            data: { post }
        })
    } catch (error) {
        res.status(400).json({ status: 'fail' })
    }
}

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'Success',
            data: { post }
        })
    } catch (error) {
        res.status(400).json({ status: 'fail' })
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'Success',
        })
    } catch (error) {
        res.status(400).json({ status: 'fail' })
    }
}


module.exports = {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
}