# Rest Api com NodeJS

O objetivo da criação desta api é colocar em prática o curso da DH

Foi utilizado o conceito de classes, e orientação a objeto 

#### Tecnologias aplicadas

- NodeJS
- ExpressJS
- mySQL
- javaScript
- JWT
- CryptoJS


#### Rotas autenticadas: Bearer Token

- http://localhost:3000/users/list

` router.get('/list', userController.list); `

```javascript
[
   {
        "id": 40,
        "Name": "LARISSA",
        "Email": "MAIL26@DOMAIN.COM.BR"
    },
    {
        "id": 42,
        "Name": "LENES",
        "Email": "LENES@DOMAIN.COM.BR"
    },
    {
        "id": 41,
        "Name": "LUANA",
        "Email": "LUANA@DOMAIN.COM.BR"
    },
    {
        "id": 44,
        "Name": "LUIZA",
        "Email": "LUIZA@DOMAIN.COM.BR"
    },
]
```

------------

- http://localhost:3000/users/list?limit=2

` router.get('/list', userController.list); `

```javascript
[
   {
        "id": 40,
        "Name": "LARISSA",
        "Email": "MAIL26@DOMAIN.COM.BR"
    },
    {
        "id": 42,
        "Name": "LENES",
        "Email": "LENES@DOMAIN.COM.BR"
    }
]
```

------------

- http://localhost:3000/users/2

` router.get('/:id', userController.user); `

```javascript
[
   {
        "id": 2,
        "Name": "LARA",
        "Email": "MAIL2@DOMAIN.COM"
    }
]
```

------------

- http://localhost:3000/users/save

` router.post('/save', userController.save); `

```javascript
{
    "data": {
        "id": 44,
        "Name": "LUIZA",
        "Email": "LUIZA@DOMAIN.COM.BR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0NCwiTmFtZSI6IkxVSVpBIiwiRW1haWwiOiJMVUlaQUBET01BSU4uQ09NLkJSIn0sImlhdCI6MTU5MTIwNzg3OSwiZXhwIjoxNTkxODEyNjc5fQ.iN8GIwzlbu84Ezx9YrdyTAWGYCrttgFLagRAaPBFgL8"
}
```

------------

- http://localhost:3000/users/edit/2

` router.put('/edit/:id', userController.edit); `

```javascript
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 1
}
```

------------

- http://localhost:3000/users/delete/35

` router.delete('/delete/:id', userController.delete); `

```javascript
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
}

```

------------

- http://localhost:3000/users/user/Aline

` router.get('/user/:name', userController.find); `

```javascript
[
    {
        "id": 3,
        "Name": "ALINE",
        "Email": "MAIL@DOMAIN.COM.BR"
    },
    {
        "id": 40,
        "Name": "ALINE",
        "Email": "MAIL2@DOMAIN.COM"
    }
]
```

------------

#### Rotas publicas

- http://localhost:3000/register

`router.post('/register', userController.save);`

- http://localhost:3000/login

`router.post('/login', userController.login);`

- http://localhost:3000/credential

```javascript
router.get('/credential', function (req, res) {
res.render('index');
});
```

![Criar credencial](http://alessandrodev.com/imagens/api7.jpg "Criar credencial")

> You'll find details about it on: public/javascripts/createCredentials.js
> The credential needs to be in headers on request 

#### Método de autenticação

http://localhost:3000/login

######  No headers passar email e senha em formato JSON criptografado em AES

` { email: userName.value, password: password.value } `

Exemplo de criptografia utilizando cryptoJS:

```javascript
let user = { email: userName.value, password: password.value };
let credential = CryptoJS.AES.encrypt(JSON.stringify(user), credential').toString();
inputCredential.value = credential;
```

###### Ficará assim:

```javascript
headers:{credential:U2FsdGVkX1/82buCFBVVnuXrxSBQMlOulgmwQ4/Xr0uHgKiF6Uhp0c9vT7r70XdpX9JaaaEImD1VQJ+eQ7EwWY+Yr7uj6yNGfotZBoGuwbI=}
```

###### Para criar uma chave utilize a pagina da rota


- http://localhost:3000/credential


##### Método de autenticação JWT

```javascript
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
```

##### Middleware utilizado em app.js

```javascript
app.use('/', indexRouter);
app.use(Auth.verifyToken);
app.use('/users', usersRouter);
```
#### Para clonar o projeto

1.  ` git clone https://github.com/ALESSANDROLMENEZES/restApi.git`
2. ` npm install`
3. configurar seu arquivo .env com as informações de seu ambiente
4. criar um banco de dados com as seguintes colunas:
![Banco de dados](http://alessandrodev.com/imagens/api5.jpg "Banco de dados")
5. `npm start`
6. Acessar via postman ou similar

------------


![Cadastro de usuário](http://alessandrodev.com/imagens/api1.jpg "Cadastro de usuário")

------------

![Listar usuarios](http://alessandrodev.com/imagens/api2.jpg "Listar usuários")

------------

![Token incorreto](http://alessandrodev.com/imagens/api3.jpg "Token incorreto")

------------

![Token não informado](http://alessandrodev.com/imagens/api4.jpg "Token não informado")

------------

![Credencial no header para login](http://alessandrodev.com/imagens/api6.jpg "Login passando a credencial")

