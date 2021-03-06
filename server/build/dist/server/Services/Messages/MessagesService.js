"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../../db/db");
var db = db_1.default.getInstance();
function getMessagesHistory(chat) {
    return new Promise(function (resolve, reject) {
        var result = _getMessagesHistory(chat);
        resolve(result);
    });
}
exports.getMessagesHistory = getMessagesHistory;
function _getMessagesHistory(chat) {
    return db.getMessageHistory(chat.senderName, chat.receiverName, chat.receiverType);
}
function addMessage(msg) {
    return new Promise(function (resolve, reject) {
        var result = _addMessage(msg);
        resolve(result);
    });
}
exports.addMessage = addMessage;
function _addMessage(msg) {
    return db.addMessageToAConversation(msg.senderName, msg.receiverName, msg.type, msg.message, msg.time);
}
//# sourceMappingURL=MessagesService.js.map