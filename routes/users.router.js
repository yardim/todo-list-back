const router = require('express').Router();
const usersService = require('../services/users.service');

class UsersRouter {
  constructor(router) {
    router.post('/create', this.create);
    router.get('/', this.read);
    router.post('/login', this.login);
  }

  create(req, res) {
    usersService.createUser(req.body).then(token => {
      res.header('x-auth', token).status(200).send();
    }).catch(err => {
      console.error(`User creation error: ${err.message}`);
      res.status(400).send(err);
    });
  }

  read(req, res) {
    const token = req.get('x-auth');

    usersService.getUserByToken(token).then(user => {
      if (user) {
        return res.status(200).json(user)
      }

      res.status(404);
    }).catch(err => {
      console.error(`Getting user by token error: ${err.message}`);
      res.status(404).send(err);
    });
  }

  login(req, res) {
    usersService.getUserByCredentials(req.body).then(user => {
      if (user) {
        return res.json(user);
      }

      res.status(404).send();
    }).catch(err => {
      console.error(`Login user error: ${err.message}`);
      res.status(404).send(err);
    });
  }
}

new UsersRouter(router);
module.exports = router;