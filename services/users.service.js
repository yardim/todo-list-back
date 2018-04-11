const { ObjectID } = require('mongodb');
const UserModel = require('../models/user.model');

class UsersService {
  constructor() { }

  createUser(params) {
    return new UserModel({
      email: params.email,
      password: params.password,
      name: params.name,
    }).save();
  }

  getUserById(id) {
    return UserModel.find({ _id: new ObjectID('5acdf2be3d92d76d608b3034') })
  }
}

module.exports = new UsersService();
