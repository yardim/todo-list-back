const { ObjectID } = require('mongodb');
const UserModel = require('../models/user.model');
var bcrypt = require('bcryptjs');

class UsersService {
  constructor() { }

  createUser(params) {
    return this.hashPassword(params.password)
      .then(hashedPassword => {
        return new UserModel({
          email: params.email,
          password: hashedPassword,
          name: params.name,
        });
      })
      .then(user => {
        return user.generateToken();
      });
  }

  hashPassword(password) {
    return bcrypt.genSalt().then((salt) => {
      return bcrypt.hash(password, salt);
    });
  }

  getUserByToken(token) {
    return UserModel.findOne({ tokens: token });
  }

  getUserByCredentials({ email, password }) {
    let user;

    return UserModel.findOne({ email }).then(foundUser => {
      if (foundUser) {
        user = foundUser;
        return bcrypt.compare(password, user.password);
      }

      return Promise.reject(new Error('User with this email not found'));
    }).then(isCredsValid => {
      if (isCredsValid) {
        return user;
      }

      return Promise.reject(new Error('Wrong password'));
    });
  }
}

module.exports = new UsersService();
