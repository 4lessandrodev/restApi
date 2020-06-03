const db = require('./../config/database');
const genericDao = require('./genericDao');

class userDao extends genericDao{
  constructor (model) {
    this.model = model;
  }

  static listUsers(model, limit = 100) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, Name, Email FROM ${model.tableName} ORDER BY Name ASC LIMIT ${limit} `, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getUser(model) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, Name, Email FROM ${model.tableName} WHERE id = ?`, [model.id] ,(err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static find(model) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, Name, Email FROM ${model.tableName} WHERE Name LIKE '%${model[model.modelName].Name}%'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

}
module.exports = userDao;