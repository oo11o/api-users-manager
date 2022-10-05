const express = require('express');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');

const { isString } = require('lodash');
const Auth = require('../db/models/auth.model');

module.exports = class AuthController {
  constructor(AuthRepository, authToken = 'example') {
    this.router = express.Router();
    this.AuthRepository = new AuthRepository(Auth);
    this.initRouters();
    this.authToken = authToken;
  }

  initRouters() {
    this.router.post('/login', jsonParser, async (req, res) => {
      const { login, password } = req.body;
      const isAdmin = await this.AuthRepository.find(req.body) != null;

      if (isAdmin) {
        const accessToken = jwt.sign({ login, role: 'Admin' }, this.authToken);
        res.json({ accessToken });
      } else {
        res.json({ result: 'Username or password incorrect' });
      }
    });
  }
};
