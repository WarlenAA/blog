**📖 BLOG DE IDEIAS**

Este é um projeto de blog desenvolvido em ***Node.js, Express, Sequelize*** (ORM para MySQL) e ***Handlebars*** (template engine).
O sistema permite registro/login de usuários, postagem de textos, comentários, edição e deleção de posts.

---

**⚙️ Pré-requisitos**
***Node.js*** (recomendado: v20 ou superior)

***NPM*** (já vem com o Node)

***XAMPP*** (para rodar o MySQL local) ou outro MySQL instalado

***MySQL Workbench*** (ou qualquer client para criar o banco)

---

**🚀 Passo a Passo para Rodar o Projeto***

***1. Clone o repositório***

`git clone https://github.com/WarlenAA/blog.git`

`cd blog`

---

***2. Instale as dependências***

`npm install`

---

***3. Configure o banco de dados***

Abra o ***XAMPP*** e inicie o serviço MySQL.

Abra o ***MySQL Workbench*** (ou outro client) e crie um banco de dados chamado:

`CREATE DATABASE banco_blog;`

O projeto já está configurado para usar o usuário padrão `root` sem senha.

Se você usa outro usuário ou senha, edite o arquivo `.env` na raiz do projeto conforme necessário:

`DB_NAME=banco_blog`

`DB_USER=root`

`DB_PASS=`

`PORT=3000`


***Obs:*** Se seu MySQL não for local ou usa porta/host diferente, ajuste `DB_HOST` no `.env`.

---

***4. Rode o projeto localmente***

`npm run dev`

O servidor vai rodar em: 
[http://localhost:3000](http://localhost:3000)

Na primeira execução, as tabelas serão criadas automaticamente pelo Sequelize.

---

***5. Acesse no navegador***

Registre um usuário, faça login, crie posts e comentários livremente!

---

💡 ***Observações***
Se quiser alterar a porta, usuário, senha ou nome do banco, basta editar o arquivo `.env` na raiz do projeto.

O MySQL precisa estar rodando para que o projeto funcione corretamente!

O projeto já trata mensagens de erro para situações comuns.

---

📜 ***Scripts disponíveis***

`npm run dev`  → Roda o projeto em modo de desenvolvimento (nodemon).

`npm start`              → Roda o projeto normalmente.

---

📁 ***Estrutura do Projeto***

```
blog/
├── controllers/               # Lógica das rotas (separação MVC)
│   ├── authController.js
│   ├── postController.js
│   └── commentController.js
├── database/
│   └── connection.js          # Configuração da conexão com o banco
├── middlewares/               # Middlewares customizados (ex: autenticação)
│   └── authMiddleware.js
├── models/                    # Modelos Sequelize (definição das tabelas)
│   └── comment.js             # Model comentário (postagens de comentários)
│   ├── index.js               # Centraliza os models e associações
│   ├── post.js                # Model post (conteúdo do blog)
│   ├── usuario.js             # Model usuário (login, dados)
└── public/                    # Arquivos estáticos (css, imagens)
│   └── css/
│       └── style.css          # Estilo da aplicação
├── routes/                    # Rotas da aplicação (organizado por funcionalidade)
│   ├── authRoutes.js          # Rotas de autenticação (login, registro)
│   └── commentRoutes.js       # Rotas para comentários
│   ├── postRoutes.js          # Rotas para posts (CRUD)
├── views/                     # Views com Handlebars (html dinâmico)
│   ├── auth/
│   │   ├── login.handlebars
│   │   └── register.handlebars
│   ├── layouts/
│   │   └── main.handlebars    # Layout padrão para as páginas
│   ├── partials/
│   │   └── navbar.handlebars  # Navbar reutilizável em várias páginas
│   ├── posts/
│   │   ├── criar.handlebars
│   │   ├── editar.handlebars
│   │   └── home.handlebars
│   └── error.handlebars       # Página de erro genérica
├── .env                       # Variáveis de ambiente (ex: senha, secret)
├── app.js                     # Arquivo principal (entrypoint do servidor)
├── package.json               # Configuração do npm, scripts e dependências
├── Readme.md
```
---

📝 ***Licença***
Este projeto é open-source para fins de estudo, aprendizado e portfólio.
