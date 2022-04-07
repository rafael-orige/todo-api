<h1>Todo API</h1>

<h2>Sobre o projeto:</h2>

Aplicação criada para estudar Banco de Dados.

As requisições foram criadas utilizando Express, Sequelize, JWT e Passport. JWT usado para enviar um token único contendo o email do usuário para o front-end. O front-end retorna o token através do headers da requisição e é feita a validação com o Passport.

Nodemailer utilizado para enviar os emails de verificação de usuário, em conjunto com md5 para criação de um código único e a confirmação de que o email utilizado é válido. Ao usuário se registrar é gerado um código que é salvo no banco de dados e utilizado na URL enviada para o email que foi disponibilizado. Quando o usuário acessar o link, é feita uma verificação para saber se o parâmetro que está na URL é o mesmo guardado no banco de dados.
<br/>

<h2>Tecnologias e bibliotecas usadas:</h2>

- Javascript
- Typescript
- Node.js
- Express
- CORS
- Nodemailer
- Sequelize
- PostgreSQL
- md5
- JWT
- Passport
- Postman
<br/><br/>

<hr/>
