"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB = require("../../db/db");
var db = new DB.default();
function getUserById(id) {
    return new Promise(function (resolve, reject) {
        var result = _getUserById(id);
        resolve(result);
    });
}
exports.getUserById = getUserById;
function _getUserById(id) {
    return db.getUserById(id);
}
function getUserByNameXORPassword(user) {
    return new Promise(function (resolve, reject) {
        var result = _getUserByNameXORPassword(user.name, user.pass);
        resolve(result);
    });
}
exports.getUserByNameXORPassword = getUserByNameXORPassword;
function _getUserByNameXORPassword(name, pass) {
    return db.getSingleUser(name, pass);
}
function getAllUsers() {
    return new Promise(function (resolve, reject) {
        var result = _getAllUsers();
        resolve(result);
    });
}
exports.getAllUsers = getAllUsers;
function _getAllUsers() {
    return db.getAllUsers();
}
//# sourceMappingURL=UsersService.js.map