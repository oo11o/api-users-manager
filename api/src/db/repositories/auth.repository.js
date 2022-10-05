const jwt = require('jsonwebtoken');

module.exports = class AuthRepository {
  constructor(Auth) {
    this.Auth = Auth;
  }

  async find(data) {
    return await this.Auth.findOne({
      where: data,
    });
  }

  async create(login, password) {
    return await this.Auth.create({ login, password });
  }
};
