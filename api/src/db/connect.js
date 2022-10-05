const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'test',
  'example',
  'example',
  {
    host: 'db-user',
    dialect: 'mariadb',
  },
);

module.exports = sequelize;
