const express = require ('express');
const router = express.Router();
//const mongoose = require('mongoose');
//require('./models/User');
//const User = mongoose.model('users')
const UserController = require('./control/UserController');

router.get('/', UserController.showAll);
router.post('/', UserController.createNew);
router.get('/edit/:id', UserController.showOne);
router.post('/edit/:id', UserController.updateOne);
router.get('/delete/:id', UserController.showToDelete);
router.post('/delete/:id', UserController.deleteOne);


/* DELETAR AQUI PRA REATIVAR
As rotas daqui para baixo são as antigas, antes de aplicar o padrão MVC

//O código abaixo envia apenas a página html sem renderização, antes de usar o EJS.
//router.get('/', function (req, res){
//    res.sendFile(__dirname + "/views/index.html")
//});

//Rota de acesso à página inicial; a rota já carrega os dados do banco para serem exibidos no Modal.
router.get('/', function (req, res){
    const data = User.collection.find().toArray((err, results) => {
        console.log("Dados Resgatados do MongoDB: ")
        console.log(results)
        res.render(__dirname + "/views/index.ejs", {users: results})
    })
});

//router.get('/', async (req, res) => {
//    User.find().sort({name: 'desc'}).then((users) => {  //Busca os usuários e lista em ordem
//        res.sendFile(__dirname + "/views/index.html", {users: users}) //Carrega a página enviando os usuários
//    }).catch((err) => {
//        console.log('Erro ao carregar usuários: '+err)
//    })
//});

//Rota para criar novo usuário no banco de dados
router.post('/', (req, res) =>{
    const newUser = {
        name: req.body.name,
        contact: req.body.contact,
        password: req.body.password
        //name: "EuMesmo",
        //contact: "eumesmo@gmail.com",
        //password: "123456"
    }
    new User(newUser).save().then(()=>{
        console.log('Usuário salvo!')
    }).catch((err)=>{
        console.log('Erro ao salvar usuário: '+ err);
    });
    res.redirect('/'); //Redireciona para a página inicial
})

//Rotas para editar um usuário com acesso dinâmico ao id
//A primeira rota dá acesso ao usuário e a segunda confirma as alterações.
router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    User.findById(id, function (err, result){
        if (err) {
            console.log("Houve um erro ao acessar o dado: ");
            console.log(err);
            res.redirect("/")
        }
        res.render(__dirname + "/views/edit.ejs", {users: result})
    })
})

router.post('/edit/:id', (req, res) =>{
    const id = req.params.id
    const name = req.body.name
    const contact = req.body.contact
    const password = req.body.password
    User.updateOne({_id: id}, {
        $set:{
            name: name,
            contact: contact,
            password: password
        }
    }, (err, result) =>{
        if (err){
            console.log("Houve um erro ao atualizar o dado: ");
            console.log(err);
            res.redirect("/")
        }
        console.log("Usuário com id '" + id + "' foi atualizado no banco de dados!")
        res.redirect('/')
    })
})

//Rota para apagar um usuário do banco de dados.
//A primeira rota direciona a uma página que exibe as informações e pede confirmação em deletar;
//enquanto a segunda rota confirma a deleção do dado do BD.
router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    User.findById(id, function (err, result){
        if (err) {
            console.log("Houve um erro ao acessar o dado: ");
            console.log(err);
            res.redirect("/")
        }
        res.render(__dirname + "/views/delete.ejs", {users: result})
    })
})

router.post('/delete/:id', (req, res) =>{
    const id = req.params.id
    User.deleteOne({_id: id}, (err, result) =>{
        if (err){
            console.log("Houve um erro ao tentar deletar o dado: ");
            console.log(err);
            res.redirect("/")
        }
        console.log("Usuário com id '" + id + "' foi apagado no banco de dados!")
        res.redirect('/')
    })
})
DELETAR AQUI PRA REATIVAR */

module.exports = router;