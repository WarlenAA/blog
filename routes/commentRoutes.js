//commentRoutes.js

const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middlewares/authMiddleware')

// Enviar comentário (POST)
router.post('/criar', authMiddleware, commentController.createComment)

module.exports = router
