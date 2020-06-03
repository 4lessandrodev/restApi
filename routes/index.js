var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController');

//PAGINA PÚBLICA 
//http://localhost:3000/register
router.post('/register', userController.save);

//http://localhost:3000/login
router.post('/login', userController.login);

//http://localhost:3000/credential
router.get('/credential', function (req, res) {
  res.render('index');
});

module.exports = router;