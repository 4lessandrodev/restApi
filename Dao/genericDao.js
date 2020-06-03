const db = require('./../config/database');

class genericDao {
  constructor (model) {
    this.model = model;
  }
  
  static list(model) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${model.tableName}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  static save(model) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${model.tableName} SET ?`, model[model.modelName],(err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static delete(model) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM ${model.tableName} WHERE id = ${[model.id]}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static update(model) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${model.tableName} SET ? WHERE id = ${model.id}`, model[model.modelName], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
      });
    });
  }
  
}

module.exports = genericDao;