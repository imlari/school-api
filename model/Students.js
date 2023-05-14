const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Students = new Schema({
    nome: {
        type: String
    },
    idade: {
        type: Number
    },
    plano: {
        type: String
    }
}, {
    collection: 'Students'
});

module.exports = mongoose.model('Students', Students);