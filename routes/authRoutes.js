//authRoutes.js

const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// Página de registro (GET)
router.get('/register', authController.showRegister)

// Recebe dados do formulário de registro (POST)
router.post('/register', authController.registerUser)

// Página de login (GET)
router.get('/login', authController.showLogin)

// Recebe dados do formulário de login (POST)
router.post('/login', authController.loginUser)

// Logout (GET)
router.get('/logout', authController.logoutUser)

module.exports = router
