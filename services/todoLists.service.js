const TodoListsModel = require('../models/todoLists.model');
const _ = require('lodash');

class TodoListsService {
  createList(params, userID) {
    params.userID = userID;
    return new TodoListsModel(params).save()
      .then(todoList => _.pick(todoList, ['name', '_id']))
      .then(todoList => {
        const clearList = {
          ...todoList,
          id: todoList._id
        }
        delete clearList.id

        return clearList;
      });
  }

  getTodoLists(userID) {
    return TodoListsModel.find({ userID }).then(todoLists => {
      return todoLists.map(list => ({
        id: list._id,
        name: list.name,
        todos: list.todos
      }));
    });
  }

  updateTodoList(_id, params) {
    return TodoListsModel.findOneAndUpdate({ _id }, {
      ..._.pick(params, ['name'])
    }, {
      new: true
    });
  }

  deleteTodoList(id) {
    return TodoListsModel.findOneAndRemove({ _id: id });
  }
}

module.exports = new TodoListsService();