const bcrypt = require('bcrypt');
class User{
  constructor (name, email, password) {
    this.tableName = 'usuarios';
    this.id = null;
    this.modelName = 'User';
    this.User = {
      Name: name,
      Email: email,
      Password: password
    };
  }

  get name() {
    return this.User.Name;
  }
  get email() {
    return this.User.Email;
  }
  get password() {
    return this.User.Password;
  }
  set name(value) {
    this.User.Name = value.toUpperCase();
  }
  set email(value) {
    this.User.Email = value.toUpperCase();
  }
  set password(value) {
    this.User.Password = bcrypt.hashSync(value, 10);
  }

  
  
}

module.exports = User;