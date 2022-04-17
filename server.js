const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Configurações do BodyParser -- Vou precisar dele para conseguir pegar os dados do formulário
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configurando usos do servidor.
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

//Configurando o EJS (Embedded Javascript)
app.set('view engine', "ejs");

//Configuração do Mongoose (https://www.npmjs.com/package/mongoose):]
mongoose.connect("mongodb://localhost/dbtest", {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log ("MongoDB contectado")
}).catch((err) => {
    console.log("Houve um erro ao se conectar ao MongoDB: " + err)
});

//Rodando o Servidor
http.createServer(app).listen(port, () => console.log("Servidor rodando local"));
