var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController');

//PAGINAS QUE REQUEREM AUTENTICAÇÃO COM TOKEN TYPE Bearer Token
//http://localhost:3000/users/list OU http://localhost:3000/users/list?limit=2
router.get('/list', userController.list);

//http://localhost:3000/users/2
router.get('/:id', userController.user);

//http://localhost:3000/users/save
router.post('/save', userController.save);

//http://localhost:3000/users/edit/2
router.put('/edit/:id', userController.edit);

//http://localhost:3000/users/delete/5
router.delete('/delete/:id', userController.delete);

//http://localhost:3000/users/user/Aline
router.get('/user/:name', userController.find);

module.exports = router;
