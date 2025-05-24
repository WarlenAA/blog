//commentController.js

const { Comment } = require('../models')

// Cria comentário atrelado ao usuário e ao post
exports.createComment = async (req, res) => {
  const { texto, postId } = req.body

  // Adicione este log para debug:
  console.log('Tentando criar comentário:', { texto, postId, usuarioId: req.session.user && req.session.user.id })

  if (!texto || !postId) {
    req.flash('error_msg', 'Comentário inválido')
    return res.redirect('/posts')
  }

  try {
    await Comment.create({
      texto,
      postId,
      usuarioId: req.session.user.id
    })
    req.flash('success_msg', 'Comentário adicionado')
    res.redirect('/posts')
  } catch (err) {
    console.error('ERRO AO SALVAR COMENTÁRIO:', err)
    req.flash('error_msg', 'Erro ao adicionar comentário')
    res.redirect('/posts')
  }
}
