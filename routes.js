const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
require('./models/User')
const User = mongoose.model('users')

router.get('/', function (req, res){
    res.sendFile(__dirname + "/views/index.html")
});

router.get('/user', (req, res) => {
    res.send("Página de Usuários");
})

//Rota para criar novo usuário no banco de dados
router.post('/newUser', (req, res) =>{
    const newUser = {
        name: req.body.nome,
        contact: req.body.contato,
        password: req.body.senha
        //name: "EuMesmo",
        //contact: "eumesmo@gmail.com",
        //password: "123456"
    }
    new User(newUser).save().then(()=>{
        console.log('Usuário salvo!')
    }).catch((err)=>{
        console.log('Erro ao salvar usuário: '+err)
    });
    res.sendFile(__dirname + "/views/index.html");
})

module.exports = router;