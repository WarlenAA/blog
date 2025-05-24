//connection.js

const { Sequelize } = require('sequelize')

// Criando uma instância do Sequelize para conectar ao banco MySQL (PlanetScale)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,     // Host do banco (ex: us-east.connect.psdb.cloud)
  dialect: 'mysql',              // Dialeto do banco (MySQL)
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,  // Ativa SSL para PlanetScale
  },
  logging: false  // Desliga logs SQL no console (pode ligar para debug)
})

module.exports = sequelize
