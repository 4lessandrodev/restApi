const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  //CRIAR UM NOVO TOKEN
  //--------------------------------------------------------
  signToken: (user) => {
    let token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  },

  //VERIFICAR SE UM TOKEN FOI INFORMADO
  //--------------------------------------------------------
  verifyToken: (req, res, next) => {
    try {
      const NOW = Date.now();
      if (!req.headers.authorization) {
        res.status(401).json({ error: { message:'Token inválido'}});
      } else {
        let token = req.headers.authorization.substring(7); //substring para tirar o "Bearer "
        let user = jwt.verify(token, process.env.SECRET_KEY);
        if (user.id != undefined) {
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