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

  updateTodo(listName, todoID, params) {
    return TodoListsModel.update({ 'todos._id': todoID }, {
      '$set': {
        'todos.$.value': params.value,
        'todos.$.isDone': params.isDone,
      }
    }, {
      new: true
    });
  }

  deleteTodo(listName, todoID) {
    console.log('deleteTodo');
    console.log('listName:', listName);
    console.log('todoID:', todoID);
  }
}

module.exports = new TodoListsService();