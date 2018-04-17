const UsersService = require('../services/users.service');

const auth = (req, res, next) => {
  const token = req.get('x-auth');

  UsersService.getUserByToken(token).then(user => {
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
