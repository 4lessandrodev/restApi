# Rest Api com NodeJS

O objetivo da criação desta api é colocar em prática o curso da DH

Foi utilizado o conceito de classes, e orientação a objeto 

#### Tecnologias aplicadas

- NodeJS
- ExpressJS
- mySQL
- javaScript
- JWT


Rotas autenticadas: Bearer Token
http://localhost:3000/users/list OU http://localhost:3000/users/list?limit=2
` router.get('/list', userController.list); `

http://localhost:3000/users/2
` router.get('/:id', userController.user); `

http://localhost:3000/users/save
` router.post('/save', userController.save); `

http://localhost:3000/users/edit/2
` router.put('/edit/:id', userController.edit); `

http://localhost:3000/users/delete/5
` router.delete('/delete/:id', userController.delete); `

http://localhost:3000/users/user/Aline
` router.get('/user/:name', userController.find); `

##### Método de autenticação JWT
```javascript
  verifyToken: (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        res.status(401).json({ error: { message:'Token inválido'}});
      } else {
        let token = req.headers.authorization.substring(7); //substring para tirar o "Bearer "
        let user = jwt.verify(token, process.env.SECRET_KEY);
        if (user.id != undefined) {
          next();
        } else {
          res.status(401).json({ error: { message: 'Token inválido' } });
        }
      }
    } catch (error) {
      res.status(401).json({ error });
    }
  }
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








