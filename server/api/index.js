const db = require('../../data/db')
const postsRouter = require('./posts')
const router = require('express').Router()

module.exports = router

router.use('/posts', postsRouter)