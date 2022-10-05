const jwt = require('jsonwebtoken');

module.exports = authenticateToken = (req, res, next) => {
  const token = req.headers['x-authorization'];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, 'example', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
