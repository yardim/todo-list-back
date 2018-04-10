const router = require('express').Router();
const BaseRouter = require('./base.router');
const usersService = require('../services/users.service');

class IndexRouter extends BaseRouter {
  constructor(router) {
    super(router);

    // rewriting pathes or adding new
    router.get('/:anotherId', this.getById.bind(this));
  }

  getById(req, res) {
    res.json({
      status: 'OK',
      value: 'Get by id in Index router',
      payload: usersService.getUserById(req.params.id)
    });
  }
}

new IndexRouter(router);
module.exports = router;