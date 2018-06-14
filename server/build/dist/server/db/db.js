"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var DB = /** @class */ (function () {
    function DB() {
        this.finding = function (o) {
            return o.getName() === "Raz" && o.getPassword() === "rrr";
        };
        var fileName = "Users";
        this.users = DB.readFromJson(fileName).users;
        fileName = "Groups";
        this.groups = DB.readFromJson(fileName).groups;
    }
    DB.readFromJson = function (fileName) {
        var data = fs.readFileSync(__dirname + "/JSONData/" + fileName + "Data.json", "UTF-8");
        return JSON.parse(data);
    };
    DB.prototype.writeToJson = function (fileName) {
        var data;
        switch (fileName) {
            case "Users":
                data = this.users;
                break;
            case "Groups":
                data = this.groups;
                break;
        }
        fs.writeFileSync(__dirname + "/JSONData/" + fileName + "Data.json", JSON.stringify(data), "UTF-8");
    };
    //static users = TempData.allUsers;
    //static groups = TempData.allGroups;
    DB.prototype.getAllEntities = function () {
        var entityArray = [];
        entityArray = entityArray.concat(this.groups).concat(this.users);
        return entityArray;
    };
    DB.prototype.getAllUsers = function () {
        return this.users;
    };
    DB.prototype.getAllGroups = function () {
        return this.groups;
    };
    DB.prototype.getSingleUser = function (userName, password) {
        var foundUser;
        console.log(this.users);
        if (password) {
            try {
                foundUser = this.users.find(this.finding);
                console.log(foundUser);
            }
            catch (e) {
                console.log("ERROR", e);
            }
        }
        else {
            foundUser = this.users.find(function (o) { return o.getName() === userName; });
        }
        console.log(foundUser);
        return foundUser;
    };
    DB.prototype.getUserById = function (id) {
        var foundUser = this.users.find(function (o) { return o.getId() === id; });
        return foundUser;
    };
    DB.prototype.getSingleGroup = function (groupName) {
        return this.groups.find(function (o) { return o.getName() === groupName; });
    };
    DB.prototype.getChatEntity = function (name) {
        var entity;
        entity = this.users.find(function (o) { return o.getName() === name; });
        if (!entity) {
            entity = this.groups.find(function (o) { return o.getName() === name; });
        }
        return entity;
    };
    DB.addMessageToAConversation = function (sender, receiver, content, time) {
        //TempData.addConversation(sender, receiver, content, time,true);
    };
    DB.getMessageHistory = function (sender, receiver) {
        var convo = []; //TempData.getConversation(sender,receiver);
        //erase the seconds from the time displayed
        // for (let message of convo) {
        //     message.timeSent = message.timeSent.substring(0,5);
        // }
        return convo;
    };
    return DB;
}());
exports.default = DB;
//# sourceMappingURL=db.js.map