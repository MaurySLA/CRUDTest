const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    id: ObjectId,
    name: {type: String, required: true},
    contact: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});

mongoose.model('users', User); //Define a coleção onde serão armazenados os dados