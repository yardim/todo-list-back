const app = require('express')();
const bodyParser = require('body-parser');

const logger = require('./utilites/logger')
const users = require('./routes/users.router');

app.use(logger);
app.use(bodyParser.json());
app.use('/users', users);

module.exports = app;
