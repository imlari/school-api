const express = require('express');
const app = express();
const studentsRoutes = express.Router();

let Students = require('../model/Students');

studentsRoutes.route('/add').post(function (req, res) {
    let students = new Students(req.body);
    students.save()
        .then(students => {
            res.status(200).json({ 'status': '200', 'mssg': 'students added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': '400', 'mssg': 'algo deu errado ao adicionar novo estudante', err });
        });
});

studentsRoutes.route('/').get(function (req, res) {
    Students.find(function (err, students) {
        if (err) {
            res.status(400).send({ 'status': '400', 'mssg': 'Houve um erro ao coletar os dados' });
        }
        else {
            res.status(200).json({ 'status': '200', 'students': students });
        }
    });
});

studentsRoutes.route('/students/:id').get(function (req, res) {
    let id = req.params.id;
    Students.findById(id, function (err, students) {
        if (err) {
            res.status(400).send({ 'status': '400', 'mssg': 'Houve um erro ao obter o dado do estudante' });
        }
        else {
            res.status(200).json({ 'status': '200', 'students': students });
        }
    });
});

studentsRoutes.route('/update/:id').put(function (req, res) {
    Students.findById(req.params.id, function (err, students) {
        if (!students) {
            res.status(400).send({ 'status': '400', 'mssg': 'Não existe estudante com o id informado' });
        } else {
            students.nome = req.body.nome;
            students.idade = req.body.idade;
            students.plano = req.body.plano;

            students.save().then(students => {
                res.status(200).json({ 'status': '200', 'mssg': 'Atualização realizadaa!' });
            })
        }
    });
});

studentsRoutes.route('/delete/:id').delete(function (req, res) {
    Students.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': '200', 'mssg': 'Algo deu errado ao deletar os dados' });
        }
        else {
            res.status(200).json({ 'status': '200', 'mssg': 'Exclusão feita com sucesso!' });
        }
    });
});

module.exports = studentsRoutes;