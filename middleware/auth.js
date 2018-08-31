const UsersService = require('../services/users.service');

const auth = (req, res, next) => {
  UsersService.getUserByToken(req.headers.authorization).then(user => {
    if (user) {
      req.user = user;
      return next();
    }

    return Promise.reject(new Error('Authentification failed'));
  }).catch(err => {
    res.status(401).send();
  });
};

module.exports = auth;
