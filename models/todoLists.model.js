const mongoose = require('../providers/db.provider');

const TodoListsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  todos: [
    {
      value: {
        type: String,
        required: true
      },
      isDone: {
        type: Boolean,
        default: false
      }
    }
  ]
});

const TodoListsModel = mongoose.model('TodoLists', TodoListsSchema);
module.exports = TodoListsModel;