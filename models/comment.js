//comment.js

const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Comment = sequelize.define('Comment', {
  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'comments',
  timestamps: true
})

module.exports = Comment
