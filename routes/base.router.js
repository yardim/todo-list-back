class BaseRouter {
  constructor(router) {
    router.get('/:id', this.getById.bind(this));
  }

  getById(req, res) {
    res.json({
      status: 'OK',
      value: 'Get by id',
      payload: { id: req.params.id }
    });
  }
}

module.exports = BaseRouter;
