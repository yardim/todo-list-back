const router = require('express').Router();
const usersService = require('../services/users.service');

class UsersRouter {
  constructor(router) {
    router.post('/create', this.create);
    router.get('/:id', this.read);
  }

  create(req, res) {
    usersService.createUser(req.body).then(token => {
      res.status(200).json({ token });
    }).catch(err => {
      console.error(`User creation error: ${err.message}`);
      res.status(400).send(err);
    });
  }

  read(req, res) {
    usersService.getUserById(req.params.id).then(user => {
      res.status(200).json(user)
    }).catch(err => {
      console.error(`Getting user error: ${err.message}`);
      res.status(404).send(err);
    });
  }
}

new UsersRouter(router);
module.exports = router;
