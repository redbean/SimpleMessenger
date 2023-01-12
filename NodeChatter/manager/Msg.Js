function MSG(user, text, chatRoomID, sentAt)
{
    this.user = user;
    this.text = text;
    this.chatRoomID = chatRoomID;
    this.sentAt = sentAt;
    this.isPrivate = false;
    this.toWhom = "";
}

MSG.prototype.getSentAt = function() {
    return this.sentAt;
}

MSG.prototype.getText = function() {
    return this.text;
}

module.exports = MSG;