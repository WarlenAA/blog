//authMiddleware.js

// Middleware para proteger rotas que exigem usuário logado
module.exports = function (req, res, next) {
    if (req.session.user) {
      next() // Se usuário está logado, deixa passar
    } else {
      req.flash('error_msg', 'Você precisa estar logado para acessar essa página')
      res.redirect('/login')
    }
  }
  