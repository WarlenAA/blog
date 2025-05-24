require('dotenv').config() // Carrega as variáveis do arquivo .env para process.env

const express = require('express')          // Importa Express
const session = require('express-session')  // Gerencia sessões
const flash = require('connect-flash')      // Mensagens temporárias (sucesso, erro)
const path = require('path')                 // Para resolver caminhos de pastas
const exphbs = require('express-handlebars')// Template engine Handlebars
const { sequelize } = require('./models') 

const app = express()  // Instancia o Express

// Configura o Handlebars como view engine
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',  // Layout padrão que envolve todas as views
  helpers: {
    // Aqui você pode colocar helpers para usar nas views (ex: formatação de data)
    // Helper para comparar dois valores
    ifCond: function (v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    formatarData: function (data) {
      // Converte string para Date se precisar
      const d = new Date(data)
      // Array com nomes dos dias da semana em português
      const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      // Formata a data e a hora
      const dia = String(d.getDate()).padStart(2, '0')
      const mes = String(d.getMonth() + 1).padStart(2, '0')
      const ano = d.getFullYear()
      const hora = String(d.getHours()).padStart(2, '0')
      const min = String(d.getMinutes()).padStart(2, '0')
      const seg = String(d.getSeconds()).padStart(2, '0')
      const diaSemana = dias[d.getDay()]
      return `${dia}/${mes}/${ano} às ${hora}:${min}:${seg}, ${diaSemana}.`
    }
  }
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views')) // Define a pasta das views

// Middleware para servir arquivos estáticos da pasta public (css, js, imagens)
app.use(express.static(path.join(__dirname, 'public')))

// Middleware para entender dados enviados via POST (formulários)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Configuração da sessão para armazenar dados do usuário logado
app.use(session({
  secret: process.env.SESSION_SECRET || 'segredo', // Chave secreta
  resave: false,      // Não salva a sessão se não mudou
  saveUninitialized: false, // Não cria sessão se não usada
  cookie: { maxAge: 3600000 } // Tempo de vida da sessão (1h)
}))

// Middleware do flash para mensagens temporárias
app.use(flash())

// Variáveis globais para as views (mensagens e usuário logado)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg') // Mensagens de sucesso
  res.locals.error_msg = req.flash('error_msg')     // Mensagens de erro
  res.locals.user = req.session.user || null        // Usuário logado (ou null)
  next()
})

// Rotas - aqui você vai importar e usar as rotas em breve
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')

app.use('/', authRoutes)        // Rotas de autenticação (login, registro)
app.use('/posts', postRoutes)   // Rotas para posts
app.use('/comments', commentRoutes) // Rotas para comentários

// Rota principal (home)
app.get('/', (req, res) => {
  res.redirect('/posts')  // Redireciona para a lista de posts
})

// Sincroniza os models com o banco de dados e SÓ DEPOIS inicia o servidor
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');

  // Inicia o servidor na porta definida no .env ou 3000
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('Erro ao sincronizar o banco:', err);
});

