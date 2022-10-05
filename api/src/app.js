const express = require('express');
const morgan = require('morgan');
const sequelize = require('./db/connect');
const faker = require('./service/fakerdata.service');

const UserRepository = require('./db/repositories/user.repository');
const AuthRepository = require('./db/repositories/auth.repository');

const logger = morgan(':method :url :status');
const { port } = require('./config');

module.exports = class App {
  constructor(UserController, AuthController) {
    this.app = express();
    this.port = port;
    this.logger = logger;
    this.UserController = new UserController(UserRepository);
    this.AuthController = new AuthController(AuthRepository);
  }

  useRoutes() {
    this.app.use(this.UserController.router);
    this.app.use(this.AuthController.router);
  }

  useError() {
    this.app.use((err, req, res, next) => {
      res.status(500).json({
        status: 500,
        error: err.message,
      });
    });
  }

  async init() {
    await sequelize.sync();
    await faker();
    this.useRoutes();
    this.useError();
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
};
