import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from 'config';

const options = {
  benchmark: true,
};

if (config.util.getEnv('NODE_ENV') !== 'development') {
  options.logging = false;
  options.benchmark = false;
}

const sequelize = new Sequelize(config.get('database.url'), options);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});
Object.keys(db).forEach((modelName) => {
  if ('loadScopes' in db[modelName]) {
    db[modelName].loadScopes(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
