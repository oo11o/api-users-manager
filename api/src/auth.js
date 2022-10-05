const jwt = require('jsonwebtoken');
const { accessToken } = require('./config')

function authenticateToken(req, res, next) {
  const authHeader = req.body.auth
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'example', (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}