//postRoutes.js

const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const authMiddleware = require('../middlewares/authMiddleware')

// Rota para listar todos os posts (home)
router.get('/', postController.listPosts)

// Rota para criar novo post (formulário)
router.get('/criar', authMiddleware, postController.showCreateForm)

// Rota para enviar dados do novo post
router.post('/criar', authMiddleware, postController.createPost)

// Rota para editar post pelo id (formulário)
router.get('/editar/:id', authMiddleware, postController.showEditForm)

// Rota para salvar edição
router.post('/editar/:id', authMiddleware, postController.editPost)

// Rota para deletar post pelo id
router.post('/deletar/:id', authMiddleware, postController.deletePost)

module.exports = router
