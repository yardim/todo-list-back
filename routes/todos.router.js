const todosService = require('../services/todos.service');
const router = require('express').Router();

class TodosRouter {
  constructor(router) {
    router.post('/:list', this.create);
    router.get('/:list', this.read);
    router.put('/:list/:id', this.update);
    router.delete('/:list/:id', this.delete);
  }

  create(req, res) {
    todosService.createTodo(req.params.list, req.body)
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
      req.params.list,
      req.params.id,
      req.body
    ).then(mongoRes => {
      if (mongoRes && mongoRes.ok) {
        res.send(mongoRes)
      }

      res.status(404).send();
    }).catch(err => {
      res.status(404).send();
    });
  }

  delete(req, res) {
    console.log('List name:', req.params.list);
    console.log('Todo id:', req.params.id);
    res.send('delete todo');
  }
}

new TodosRouter(router);
module.exports = router;