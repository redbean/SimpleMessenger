function user(id, userName) 
{
    this.id = id;
    this.userName = userName;
}

user.prototype.getid = function() {
    return this.id;
}

user.prototype.getName = function() {
    return this.userName;
}

module.exports = user;