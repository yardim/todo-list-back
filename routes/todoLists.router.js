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
    todoListsService.createList(req.body).then(todoList => {
      res.json(todoList);
    }).catch(err => {
      res.status(400).json(err);
    });
  }

  read(req, res) {
    res.send('read todolist');
    todoListsService.getTodoLists();
  }

  update(req, res) {
    res.send('update todolist');
    todoListsService.updateTodoList(req.params.id, req.body);
  }

  delete(req, res) {
    res.send('delete todolist');
    todoListsService.deleteTodoList(req.params.id);
  }
}

new TodoListsRouter(router);
module.exports = router;
