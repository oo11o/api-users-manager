const { Sequelize } = require('sequelize');
const sequelize = require('../connect');

module.exports = sequelize.define('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNullNull: false,
    type: Sequelize.INTEGER,
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
});
