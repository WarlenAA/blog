//postController.js

const { Post, Usuario } = require('../models')
const { Comment } = require('../models')

// Lista todos os posts, mostrando o usuário autor
exports.listPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
          { model: Usuario, attributes: ['nome'] },
          { model: Comment, include: [{ model: Usuario, attributes: ['nome'] }] }
      ],
      order: [['createdAt', 'DESC']]
  })
  const plainPosts = posts.map(post => post.get({ plain: true }))
  res.render('posts/home', { posts: plainPosts })
  } catch (err) {
    console.error(err)
    res.render('error', { message: 'Erro ao carregar posts' })
  }
}

// Exibe formulário para criar novo post
exports.showCreateForm = (req, res) => {
  res.render('posts/criar')
}

// Cria novo post no banco com usuário logado
exports.createPost = async (req, res) => {
  const { titulo, conteudo } = req.body
  if (!titulo || !conteudo) {
    req.flash('error_msg', 'Preencha todos os campos')
    return res.redirect('/posts/criar')
  }
  try {
    await Post.create({
      titulo,
      conteudo,
      usuarioId: req.session.user.id
    })
    req.flash('success_msg', 'Post criado com sucesso')
    res.redirect('/posts')
  } catch (err) {
    console.error(err)
    req.flash('error_msg', 'Erro ao criar post')
    res.redirect('/posts/criar')
  }
}

// Exibe formulário para editar post (verifica se é dono)
exports.showEditForm = async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findByPk(id)
    if (!post) {
      req.flash('error_msg', 'Post não encontrado')
      return res.redirect('/posts')
    }
    if (post.usuarioId !== req.session.user.id) {
      req.flash('error_msg', 'Você não tem permissão para editar esse post')
      return res.redirect('/posts')
    }
    res.render('posts/editar', { post: post.get({ plain: true }) })
  } catch (err) {
    console.error(err)
    req.flash('error_msg', 'Erro ao carregar post')
    res.redirect('/posts')
  }
}

// Salva edição do post
exports.editPost = async (req, res) => {
  const id = req.params.id
  const { titulo, conteudo } = req.body
  if (!titulo || !conteudo) {
    req.flash('error_msg', 'Preencha todos os campos')
    return res.redirect(`/posts/editar/${id}`)
  }
  try {
    const post = await Post.findByPk(id)
    if (!post) {
      req.flash('error_msg', 'Post não encontrado')
      return res.redirect('/posts')
    }
    if (post.usuarioId !== req.session.user.id) {
      req.flash('error_msg', 'Você não tem permissão para editar esse post')
      return res.redirect('/posts')
    }

    post.titulo = titulo
    post.conteudo = conteudo
    await post.save()

    req.flash('success_msg', 'Post atualizado com sucesso')
    res.redirect('/posts')
  } catch (err) {
    console.error(err)
    req.flash('error_msg', 'Erro ao atualizar post')
    res.redirect(`/posts/editar/${id}`)
  }
}

// Deleta post (verifica dono)
exports.deletePost = async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findByPk(id)
    if (!post) {
      req.flash('error_msg', 'Post não encontrado')
      return res.redirect('/posts')
    }
    if (post.usuarioId !== req.session.user.id) {
      req.flash('error_msg', 'Você não tem permissão para deletar esse post')
      return res.redirect('/posts')
    }
    await post.destroy()
    req.flash('success_msg', 'Post deletado')
    res.redirect('/posts')
  } catch (err) {
    console.error(err)
    req.flash('error_msg', 'Erro ao deletar post')
    res.redirect('/posts')
  }
}
