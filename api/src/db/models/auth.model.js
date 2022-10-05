const { Sequelize } = require('sequelize');
const sequelize = require('../connect');

module.exports = sequelize.define('Auth', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNullNull: false,
    type: Sequelize.INTEGER,
  },
  login: {
    type: Sequelize.STRING,
    allowNullNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNullNull: false,
  },
});
