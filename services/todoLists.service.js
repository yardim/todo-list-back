const TodoListsModel = require('../models/todoLists.model');

class TodoListsService {
  createList(params) {
    console.log(params);
    return new TodoListsModel(params).save();
  }

  getTodoLists() {
    console.log('getTodoLists');
  }

  updateTodoList(id, params) {
    console.log(id, params);
  }

  deleteTodoList(id) {
    console.log(id);
  }
}

module.exports = new TodoListsService();