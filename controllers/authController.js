//authController.js

const bcrypt = require('bcryptjs')
const { Usuario } = require('../models')

// Renderiza página de registro
exports.showRegister = (req, res) => {
  res.render('auth/register')
}

// Registra novo usuário
exports.registerUser = async (req, res) => {
  const { nome, email, senha, senha2 } = req.body

  // Validação básica
  if (!nome || !email || !senha || !senha2) {
    req.flash('error_msg', 'Preencha todos os campos')
    return res.redirect('/register')
  }
  if (senha !== senha2) {
    req.flash('error_msg', 'Senhas não conferem')
    return res.redirect('/register')
  }

  try {
    // Verifica se usuário já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } })
    if (usuarioExistente) {
      req.flash('error_msg', 'Email já cadastrado')
      return res.redirect('/register')
    }

    // Criptografa senha
    const salt = await bcrypt.genSalt(10)
    const hashSenha = await bcrypt.hash(senha, salt)

    // Cria usuário
    await Usuario.create({ nome, email, senha: hashSenha })

    req.flash('success_msg', 'Cadastro realizado com sucesso! Faça login.')
    res.redirect('/login')
  } catch (err) {
    console.error(err)
    req.flash('error_msg', 'Erro ao registrar usuário')
    res.redirect('/register')
  }
}

// Renderiza página de login
exports.showLogin = (req, res) => {
  res.render('auth/login')
}

// Faz login do usuário
exports.loginUser = async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    req.flash('error_msg', 'Preencha todos os campos')
    return res.redirect('/login')
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
      req.flash('error_msg', 'Usuário não encontrado')
      return res.redirect('/login')
    }

    // Confere senha com bcrypt
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
      req.flash('error_msg', 'Senha incorreta')
      return res.redirect('/login')
    }

    // Salva dados na sessão
    req.session.user = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }

    req.flash('success_msg', 'Logado com sucesso')
    res.redirect('/posts')
  } catch (err) {
    console.error(err)
    req.flash('error_msg', 'Erro no login')
    res.redirect('/login')
  }
}

// Logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}
