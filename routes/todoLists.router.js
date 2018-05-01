const router = require('express').Router();
const todoListsService = require('../services/todoLists.service');

class TodoListsRouter {
  constructor(router) {
    router.post('/create', this.create);
    router.get('/', this.read);
    router.put('/update/:name', this.update);
    router.delete('/delete/:name', this.delete);
  }

  create(req, res) {
    todoListsService.createList(req.body).then(todoList => {
      res.json(todoList);
    }).catch(err => {
      res.status(400).json(err);
    });
  }

  read(req, res) {
    todoListsService.getTodoLists().then(todoLists => {
      res.json(todoLists);
    }).catch(err => {
      res.status(404).json(err);
    });
  }

  update(req, res) {
    todoListsService.updateTodoList(req.params.name, req.body).then(todoList => {
      if (todoList) {
        return res.json(todoList);
      }

      res.status(404).send();
    }).catch(err => {
      res.status(404).send();
    });
  }

  delete(req, res) {
    todoListsService.deleteTodoList(req.params.name).then(todoList => {
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
