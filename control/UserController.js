const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users')

module.exports ={

    showAll(req, res){
        const data = User.collection.find().toArray((err, results) => {
        console.log("Dados Resgatados do MongoDB: ")
        console.log(results)
        res.render(__dirname + "/../views/index.ejs", {users: results})
    })},

    createNew(req, res) {
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
        })
        res.redirect('/'); //Redireciona para a página inicial
    },

    showOne(req, res) {
        const id = req.params.id
        User.findById(id, function (err, result){
            if (err) {
                console.log("Houve um erro ao acessar o dado: ");
                console.log(err);
                res.redirect("/")
            }
            res.render(__dirname + "/../views/edit.ejs", {users: result})
        })
    },

    updateOne(req, res) {
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
    },

    showToDelete(req, res) {
        const id = req.params.id
        User.findById(id, function (err, result){
            if (err) {
                console.log("Houve um erro ao acessar o dado: ");
                console.log(err);
                res.redirect("/")
            }
            res.render(__dirname + "/../views/delete.ejs", {users: result})
        })
    },

    deleteOne(req, res) {
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
    }

}