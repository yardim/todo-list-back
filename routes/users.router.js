const router = require('express').Router();
const usersService = require('../services/users.service');

class UsersRouter {
  constructor(router) {
    router.post('/create', this.create);
    router.get('/:id', this.read);
  }

  create(req, res) {
    usersService.createUser(req.body).then(user => {
      res.json(user);
    }).catch(err => {
      console.error(`User creation error: ${err.message}`);
      res.json({ status: 500 });
    });
  }

  read(req, res) {
    usersService.getUserById(req.params.id).then(doc => {
      res.json(doc)
    }).catch(err => {
      console.error(`Getting user error: ${err.message}`);
      res.json({ status: 404 });
    });
  }
}

new UsersRouter(router);
module.exports = router;
