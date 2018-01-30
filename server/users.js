var Users = class Users {
  constructor () {
    this.users = [];
  }

  addUser(id,username,channel) {
    var user = {id, username, channel};
    this.users.push(user);
    return user;
  }

  getUser(id) {
    var user = this.users.filter((user)=> user.id === id)[0];
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((id)=> user.id !== id );
    }
    return user;
  }

  getAllUsers() {
    return this.users.map((user) => user.username);
  }

  getUserList(channel) {
    var users = this.users.filter((user)=> user.channel === channel);
    var namesArray = users.map((user) => user.username );
    return namesArray;
  }
}

module.exports = Users;
