//post.js

const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Post = sequelize.define('Post', {
  // id é criado automaticamente como PK e auto incremento
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // título obrigatório
    }
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true // conteúdo obrigatório
    }
  }
}, {
  tableName: 'posts', // nome da tabela no banco
  timestamps: true    // createdAt e updatedAt automáticos
})

module.exports = Post
