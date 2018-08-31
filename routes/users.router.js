const router = require('express').Router();
const usersService = require('../services/users.service');

class UsersRouter {
  constructor(router) {
    router.post('/create', this.create);
    router.get('/', this.read);
    router.post('/login', this.login);
    router.put('/update', this.update);
  }

  create(req, res) {
    usersService.createUser(req.body).then(user => {
      res
        .status(200)
        .send(user);
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
        return res.json({
          name: user.name,
          token: user.tokens[0]
        });
      }

      console.error('User with this creds not found');
      res.status(404).send({
        errorMessage: 'User with this credentials not found'
      });
    }).catch(error => {
      console.error(`Login user error: ${error.message}`);
      res.status(404).send({
        errorMessage: error.message
      });
    });
  }

  update(req, res) {
    const token = req.get('x-auth');

    usersService.updateUser({
      token,
      updateOptions: req.body
    }).then(user => {
      if (user) {
        return res.json(user);
      }
  
      res.status(400).send();
    }).catch(err => {
      console.error(`Update user error: ${err.message}`);
      res.status(400).send(err);
    });
  }
}

new UsersRouter(router);
module.exports = router;
