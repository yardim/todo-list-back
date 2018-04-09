class BaseRouter {
  constructor(router) {
    router.get('/', (req, res) => {
      res.json({ status: 'OK' })
    });
  }
}

module.exports = BaseRouter;
