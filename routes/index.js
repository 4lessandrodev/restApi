var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController');

//PAGINA PÚBLICA 
//http://localhost:3000/users/save
router.post('/save', userController.save);


module.exports = router;