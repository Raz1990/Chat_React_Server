"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../../db/db");
var db = db_1.default.getInstance();
function getUserById(id) {
    return new Promise(function (resolve, reject) {
        var result = db.getUserById(id);
        resolve(result);
    });
}
exports.getUserById = getUserById;
function getUserByNameXORPassword(user) {
    return new Promise(function (resolve, reject) {
        var result = db.getSingleUser(user.name, user.pass);
        resolve(result);
    });
}
exports.getUserByNameXORPassword = getUserByNameXORPassword;
function getAllUsers() {
    return new Promise(function (resolve, reject) {
        var result = db.getAllUsers();
        resolve(result);
    });
}
exports.getAllUsers = getAllUsers;
function addUser(user) {
    return new Promise(function (resolve, reject) {
        var result = db.addUser(user);
        resolve(result);
    });
}
exports.addUser = addUser;
//# sourceMappingURL=UsersService.js.map