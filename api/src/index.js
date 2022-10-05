const App = require('./app');
const UserController = require('./controllers/users.controller');
const AuthController = require('./controllers/auth.controller');

const app = new App(
  UserController,
  AuthController,
);
app.init();
