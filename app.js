const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./middleware/auth');
const logger = require('./utilites/logger');

const users = require('./routes/users.router');
const todoLists = require('./routes/todoLists.router');
const todos = require('./routes/todos.router');



app.use(cors());
app.options('/users/create', cors({
  exposedHeaders: ['x-auth']
}));
app.use(logger);
app.use(bodyParser.json());

app.use('/users', users);
app.use('/todo-lists', auth, todoLists);
app.use('/todos', auth, todos);



module.exports = app;
