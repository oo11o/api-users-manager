const express = require('express');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const User = require('../db/models/users.model');
const authMiddleware = require('../service/auth.service');

module.exports = class UserController {
  constructor(UserRepository) {
    this.router = express.Router();
    this.UserRepository = new UserRepository(User);
    this.initRouters();
  }

  initRouters(auth = authMiddleware) {
    this.router.get('/users', async (req, res) => {
      this.UserRepository.showAll()
        .then((result) => {
          res.status(result ? 200 : 404)
            .json({ result: result || 'Not Found Users' });
        }).catch((e) => {
          res.status(500).json({ error: e.message });
        });
    });

    this.router.get('/users/:id', (req, res) => {
      this.UserRepository
        .showById(req.params.id)
        .then((result) => {
          res.status(result ? 200 : 404)
            .json({ result: result || 'Not Found User' });
        }).catch((e) => {
          res.status(500).json({ error: e.message });
        });
    });

    this.router.post('/users', jsonParser, auth, async (req, res) => {
      if (!req.body.firstname || !req.body.secondname) {
        res.status(400).json({ error: 'need firstname and secondname' });
        return;
      }

      this.UserRepository
        .create(req.body.firstname, req.body.secondname)
        .then((result) => {
          res.status(201).json(result);
        }).catch((e) => {
          res.status(500).json({ error: e.message });
        });
    });

    this.router.patch('/users/:id', jsonParser, auth, (req, res) => {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'need id' });
        return;
      }
      this.UserRepository
        .update(id, req.body)
        .then((result) => {
          res.status(result ? 200 : 204).json({ result: 'true' });
        })
        .catch((e) => {
          res.status(500).json({ error: e.message });
        });
    });

    this.router.delete('/users/:id', auth, async (req, res) => {
      if (this._isNotNumber(req.params.id)) {
        res.status(400).json({ error: 'need id' });
        return;
      }

      this.UserRepository.delete(req.params.id)
        .then((result) => {
          res.status(200).json({ result });
        })
        .catch((e) => {
          res.status(500).json({ error: e.message });
        });
    });
  }

  _isNotNumber(id) {
    return isNaN(Number(id));
  }
};
