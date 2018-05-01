const TodoListsModel = require('../models/todoLists.model');
const _ = require('lodash');

class TodoListsService {
  createList(params) {
    return new TodoListsModel(params).save();
  }

  getTodoLists() {
    return TodoListsModel.find().then(todoLists => {
      return todoLists.map(list => ({
        name: list.name,
        todos: list.todos
      }));
    });
  }

  updateTodoList(name, params) {
    return TodoListsModel.findOneAndUpdate({ name }, {
      ..._.pick(params, ['name'])
    }, {
      new: true
    });
  }

  deleteTodoList(name) {
    return TodoListsModel.findOneAndRemove({ name });
  }
}

module.exports = new TodoListsService();