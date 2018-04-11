const mongoose = require('../providers/db.provider');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
