const router = require('express').Router();
const todoListsService = require('../services/todoLists.service');

class TodoListsRouter {
  constructor(router) {
    router.post('/create', this.create);
    router.get('/', this.read);
    router.put('/update/:id', this.update);
    router.delete('/delete/:id', this.delete);
  }

  create(req, res) {
    todoListsService.createList(req.body, req.user._id).then(todoList => {
      res.json(todoList);
    }).catch(err => {
      res.status(400).json({
        message: err.message,
        code: err.code
      });
    });
  }

  read(req, res) {
    todoListsService.getTodoLists(req.user._id).then(todoLists => {
      res.json(todoLists);
    }).catch(err => {
      res.status(404).json(err);
    });
  }

  update(req, res) {
    console.log(req.params.id, req.body.name);
    todoListsService.updateTodoList(req.params.id, req.body).then(todoList => {
      if (todoList) {
        return res.json(todoList);
      }

      res.status(404).send();
    }).catch(err => {
      res.status(404).send();
    });
  }

  delete(req, res) {
    todoListsService.deleteTodoList(req.params.id).then(todoList => {
      if (todoList) {
        res.json(todoList);
      }

      res.status(404).send();
    }).catch(err => {
      res.status(404).send();
    });
  }
}

new TodoListsRouter(router);
module.exports = router;
