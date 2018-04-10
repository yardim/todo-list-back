class UserModel {
  constructor(params) {
    this.id = params.id;
    this.name = params.name;
    this.login = params.login;
    this.password = params.password;
  }
}

module.exports = UserModel;
