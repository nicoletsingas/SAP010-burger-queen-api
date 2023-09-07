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

/*
module.exports = (secret) => (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.info("Authorization header missing");
    return next();
  }

  const [type, token] = authorization.split(" ");

  if (type.toLowerCase() !== "bearer") {
    console.warn("Invalid authorization type");
    return next();
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).send("Unauthorized");
    }
    console.info("Token verified", decodedToken);
    req.user = decodedToken;
    next();
  });
};

module.exports.isAuthenticated = (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization.length === 2) {
      res.status(400).send("Invalid token");
    }

    if (!authorization.split(" ")[0] === "Bearer") {
      res.status(400).send("Invalid token format");
    }

    const token = authorization.split(" ")[1];
    const tokenVerify = jwt.verify(token, secret);

    return true;
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports.isAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const user = jwt.verify(token, secret);
  if (user.role === "admin") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports.requireAuth = (req, res, next) => {
  if (!module.exports.isAuthenticated(req, res)) {
    return res.status(401).send("Authentication required");
  }
  next();
};

module.exports.requireAdmin = (req, res, next) => {
  if (!module.exports.isAuthenticated(req, res)) {
    return res.status(401).send("Authentication required");
  }
  if (!module.exports.isAdmin(req)) {
    return res.status(403).send("Unauthorized");
  }
  next();
}; */
