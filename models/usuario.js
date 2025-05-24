//usuario.js

const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

// Model Usuário representa a tabela 'usuarios' no banco
const Usuario = sequelize.define('Usuario', {
  // id é criado automaticamente como PRIMARY KEY e AUTO_INCREMENT pelo Sequelize
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true  // Não pode estar vazio
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,    // Email único (não pode repetir)
    validate: {
      isEmail: true  // Deve ser um email válido
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',   // Nome da tabela no banco
  timestamps: true         // Cria colunas createdAt e updatedAt automaticamente
})

module.exports = Usuario
