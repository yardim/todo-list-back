const UserModel = require('../models/user.model');

class UsersService {
  constructor() { }

  getUserById(id) {
    return new UserModel({
      id,
      name: 'test name',
      login: 'testLogin',
      password: 'testPassword'
    });
  }
}

module.exports = new UsersService();
