const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  //CRIAR UM NOVO TOKEN
  //--------------------------------------------------------
  signToken: (user) => {
    let token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  },

  //VALIDAR TOKEN
  //--------------------------------------------------------
  verifyToken: (req, res, next) => {
    try {
      const NOW = Date.now();
      if (!req.headers.authorization) {
        res.status(401).json({ error: { message:'Token inválido'}});
      } else {
        //substring para tirar o "Bearer "
        let token = req.headers.authorization.substring(7); 
        let user = jwt.verify(token, process.env.SECRET_KEY);
        if (user.id != undefined) {
          //Verificar se o token expirou
          if (NOW > user.exp * 1000) {
            res.status(401).json({ error: { message: 'Token expirado' } });
          } else {
            next();
          }
        } else {
          res.status(401).json({ error: { message: 'Token inválido' } });
        }
      }
    } catch (error) {
      res.status(401).json({ error });
    }
  }
  
};