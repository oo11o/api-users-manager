const User = require('../db/models/users.model');
const Auth = require('../db/models/auth.model');

const UserRepository = require('../db/repositories/user.repository');

const userTable = new UserRepository(User);

const AuthRepository = require('../db/repositories/auth.repository');
const { isEmpty } = require('lodash');

const authTable = new AuthRepository(Auth);

module.exports = async () => {
  const allData = await userTable.showAll();
  if (isEmpty(allData)) {
    userTable.create('Nick', 'Doe');
    userTable.create('Dana', 'Smith');
    userTable.create('Mike', 'Trust');
    authTable.create('Admin', 'example');
  } else {
    console.log('data is ready');
  }
};
