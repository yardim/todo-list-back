const TodoListsModel = require('../models/todoLists.model');
const _ = require('lodash');

class TodoListsService {
  createTodo(listName, params) {
    return TodoListsModel.findOne({ name: listName }).then(todoList => {
      todoList.todos.push({
        ..._.pick(params, ['value'])
      });

      return todoList.save();
    }).then(todoList => {
      return todoList.todos[todoList.todos.length - 1]
    });
  }

  getTodos(listName) {
    return TodoListsModel.findOne({ name: listName }).then(todoList => {
      if (todoList) {
        return todoList.todos
      }

      return null;
    });
  }

  updateTodo(todoID, params) {
    const updateObj = {};

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        updateObj[`todos.$.${key}`] = params[key];
      }
    }

    return TodoListsModel.update({ 'todos._id': todoID }, {
      '$set': updateObj
    }, {
      new: true
    });
  }

  deleteTodo(listName, todoID) {
    return TodoListsModel
      .findOneAndUpdate({
        name: listName
      }, {
        '$pull': {
          'todos': {
            _id: todoID
          }
        }
      })
      .then(todoList => {
        return todoList.todos.find(todo => (
          todo._id.toString() === todoID
        ));
      });
  }
}

module.exports = new TodoListsService();