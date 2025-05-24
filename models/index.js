//index.js

const sequelize = require('../database/connection')

const Usuario = require('./usuario')
const Post = require('./post')
const Comment = require('./comment')

// Definindo relações entre os modelos (associações)
// Um usuário pode ter muitos posts
Usuario.hasMany(Post, { foreignKey: 'usuarioId', onDelete: 'CASCADE' })
Post.belongsTo(Usuario, { foreignKey: 'usuarioId' })

// Um post pode ter muitos comentários
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' })
Comment.belongsTo(Post, { foreignKey: 'postId' })

// Um usuário pode ter muitos comentários
Usuario.hasMany(Comment, { foreignKey: 'usuarioId', onDelete: 'CASCADE' })
Comment.belongsTo(Usuario, { foreignKey: 'usuarioId' })

module.exports = {
  sequelize,
  Usuario,
  Post,
  Comment
}
