const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`)
  .then(data => {
    console.log('DB connected successfully');
  })
  .catch(err => {
    console.log('DB connection error:', err.message);
  });

module.exports = mongoose;
