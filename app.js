const app = require('express')();

const logger = require('./utilites/logger')
const index = require('./routes/index.router');

app.use(logger);
app.use('/', index)

module.exports = app;
