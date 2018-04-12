const validator = require('validator');
const jwt = require('jsonwebtoken');
const mongoose = require('../providers/db.provider');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true
  },
  tokens: {
    type: [String]
  }
});

UserSchema.methods.generateToken = function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toHexString()}, 'abc123').toString();
  user.tokens.push(token);

  return user.save().then(() => {
    return token;
  });
};

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
