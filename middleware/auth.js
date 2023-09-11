const jwt = require('jsonwebtoken');

const { secret } = require('../config');

const requiredAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization.length === 2) {
      res.status(400).send('Invalid token');
    }

    if (!authorization.split(' ')[0] === 'Bearer') {
      res.status(400).send('Invalid token format');
    }

    const token = authorization.split(' ')[1];
    const tokenVerify = jwt.verify(token, secret);

    req.user = tokenVerify;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

const isAdmin = (req, res, next) => {
  const { user } = req;
  if (user.role === 'admin') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = {
  requiredAuth,
  isAdmin,
};
