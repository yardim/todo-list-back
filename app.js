const app = require('express')();
const bodyParser = require('body-parser');

const auth = require('./middleware/auth');
const logger = require('./utilites/logger');
const users = require('./routes/users.router');
const todoLists = require('./routes/todoLists.router');

app.use(logger);
app.use(bodyParser.json());

app.use('/users', users);
app.use('/todo-lists', auth, todoLists);

module.exports = app;
