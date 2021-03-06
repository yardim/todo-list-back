const todosService = require('../services/todos.service');
const router = require('express').Router();

class TodosRouter {
  constructor(router) {
    router.post('/create/:listID', this.create);
    router.get('/:list', this.read);
    router.put('/update/:id', this.update);
    router.delete('/delete/:list/:id', this.delete);
  }

  create(req, res) {
    console.log(req.params.listID);
    todosService.createTodo(req.params.listID, req.body)
      .then(todo => {
        res.send(todo);
      })
      .catch(err => {
        res.status(400).send();
      });
  }

  read(req, res) {
    todosService.getTodos(req.params.list)
      .then(todos => {
        if (!todos || todos.length === 0) {
          return res.status(404).send();
        }

        res.send(todos);
      })
      .catch(err => {
        res.status(404).send();
      });
  }

  update(req, res) {
    todosService.updateTodo(
      req.params.id,
      req.body
    )
      .then(mongoRes => {
        if (mongoRes && mongoRes.ok) {
          return res.send(mongoRes)
        }

        res.status(404).send();
      })
      .catch(err => {
        res.status(404).send();
      });
  }

  delete(req, res) {
    todosService.deleteTodo(req.params.list, req.params.id)
      .then(todo => {
        res.send(todo);
      })
      .catch(err => {
        res.status(404).send();
      });
  }
}

new TodosRouter(router);
module.exports = router;