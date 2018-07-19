const TodoListsModel = require('../models/todoLists.model');
const _ = require('lodash');

class TodoListsService {
  createList(params, userID) {
    params.userID = userID;
    return new TodoListsModel(params).save();
  }

  getTodoLists(userID) {
    return TodoListsModel.find({ userID }).then(todoLists => {
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