const jwt = require('jsonwebtoken');
const cryptoJs = require('crypto-js');
require('dotenv').config();

module.exports = {
  //CRIAR UM NOVO TOKEN
  //--------------------------------------------------------
  signToken: (user) => {
    let token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '7 days' });
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
        let decode = jwt.verify(token, process.env.SECRET_KEY);
        if (decode.data.id != undefined) {
          //Verificar se o token expirou
          if (NOW > decode.exp * 1000) {
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
  },

  //Decodificar credenciais de login
  decodeCredentials: (req, res, next) => {
    try {
      if (!req.headers.credential) {
        return false;
      }
      let credential = req.headers.credential;
      var bytes = cryptoJs.AES.decrypt(credential, 'credential');
      var decoded = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
      return decoded; 
    } catch (error) {
      return false;
    }
  }
  
};