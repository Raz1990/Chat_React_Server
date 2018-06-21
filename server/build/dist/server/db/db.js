"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var UsefullFunctions_1 = require("../Models/Classess/UsefullFunctions");
var DB = /** @class */ (function () {
    function DB() {
        this.replies = {};
        var fileName = "Users";
        this.users = DB.readFromJson(fileName).users;
        //this.users = MyFunctions.Userify(DB.readFromJson(fileName).users);
        fileName = "Groups";
        this.groups = DB.readFromJson(fileName).groups;
        //this.groups = MyFunctions.Groupify(DB.readFromJson(fileName).groups);
        this.generateMockUpAnswers();
    }
    DB.getInstance = function () {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    };
    DB.readFromJson = function (fileName) {
        var data = "";
        try {
            data = fs.readFileSync(__dirname + "/JSONData/" + fileName + "Data.json", "UTF-8");
        }
        catch (e) {
            console.log('ERROR READING JSON', e);
        }
        return JSON.parse(data);
    };
    DB.prototype.writeToJson = function (fileName, outerData) {
        var data;
        switch (fileName) {
            case "Users":
                data = this.users;
                break;
            case "Groups":
                data = this.groups;
                break;
            default:
                data = outerData;
                break;
        }
        try {
            fs.writeFileSync(__dirname + "/JSONData/" + fileName + "Data.json", JSON.stringify(data), "UTF-8");
        }
        catch (e) {
            console.log('ERROR WRITING TO JSON -> ', e);
        }
    };
    //static users = TempData.allUsers;
    //static groups = TempData.allGroups;
    DB.prototype.getAllEntities = function () {
        var entityArray = [];
        entityArray = entityArray.concat(UsefullFunctions_1.default.Groupify(this.groups)).concat(UsefullFunctions_1.default.Userify(this.users));
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
        if (password) {
            try {
                foundUser = this.users.find(function (o) { return o["user_name"] === userName && o["password"] === password; });
            }
            catch (e) {
                console.log("ERROR", e);
            }
        }
        else {
            foundUser = this.users.find(function (o) { return o["user_name"] === userName; });
        }
        return UsefullFunctions_1.default.UserifyOne(foundUser);
    };
    DB.prototype.getUserById = function (id) {
        var foundUser = this.users.find(function (o) { return o["id"] === id; });
        return foundUser;
    };
    DB.prototype.getSingleGroup = function (groupName) {
        var foundGroup = UsefullFunctions_1.default.Groupify(this.groups).find(function (o) { return o["group_name"] === groupName; });
        return foundGroup;
    };
    DB.prototype.getChatEntity = function (name) {
        var entity;
        entity = this.users.find(function (o) { return o["user_name"] === name; });
        if (!entity) {
            entity = this.groups.find(function (o) { return o["group_name"] === name; });
        }
        return entity;
    };
    DB.prototype.addMessageToAConversation = function (senderName, receiverName, type, content, time) {
        var sender = this.getSingleUser(senderName);
        var receiver;
        if (type === 'group') {
            receiver = this.getSingleGroup(receiverName);
        }
        else {
            receiver = this.getSingleUser(receiverName);
        }
        return this.addConversation(sender, receiver, content, time, true);
    };
    DB.prototype.addConversation = function (sender, receiver, content, time, real) {
        var messages = DB.readFromJson("Messages");
        //if its the first time the sender ever sent a message
        if (!messages[sender.getName()]) {
            messages[sender.getName()] = {};
        }
        //will be useful in the future when getting info from the db
        var bubbleId = 0;
        //if its the first time the sender sent a message to a specific entity
        if (!messages[sender.getName()][receiver.getName()]) {
            messages[sender.getName()][receiver.getName()] = { val: [] };
        }
        else {
            var convo = messages[sender.getName()][receiver.getName()].val;
            bubbleId = convo[convo.length - 1].id + 1;
        }
        //add the "bubble" to the correct conversation
        messages[sender.getName()][receiver.getName()].val.push(this.newBubble(bubbleId, sender, receiver, content, time));
        //the actual "saving" part of the message in the "DB"
        this.writeToJson("Messages", messages);
        //an echo back when talking "live"
        if (real) {
            if (receiver.getType() === 'group') {
                // currently sticks the convo to a static user,
                // in reality it will get the real sending user from the server
                //this.addConversation(this.Itay, receiver, this.AIReply(receiver.getName()), time);
            }
            else {
                this.addConversation(receiver, sender, this.AIReply(receiver.getName()), time);
            }
        }
        return true;
    };
    DB.prototype.newBubble = function (bubbleId, sender, receiver, content, time) {
        return {
            id: bubbleId,
            content: content,
            sender: { id: sender.getId(), name: sender.getName() },
            receiver: { id: receiver.getId(), name: receiver.getName() },
            timeSent: time
        };
    };
    DB.prototype.AIReply = function (receiver) {
        var rand = Math.floor(Math.random() * this.replies[receiver].length);
        var reply = this.replies[receiver][rand];
        return reply;
    };
    DB.prototype.generateMockUpAnswers = function () {
        this.replies['Raz'] = ['פיצה ויומנגס וצ\'יפס', 'מה הקטע לדבר עם עצמך?', 'מדבר עם עצמך? באמת?', 'רפלקציה עצמית זה מגניב', 'מה נסגר לדבר עם עצמך?', 'הד הד הדדד', 'המחלקה הפסיכיאטרית בכיוון ההוא'];
        this.replies['Moshe'] = ['הכל חרטא ברטא תאמין לי', 'יש לי נוד שמביא צ\'ילדרן של נאד', 'אמן', 'לא אכפת לי, אתה צדיק'];
        this.replies['Itay'] = ['עכשיו תוסיף עוד 100 ש"ח', 'זה גורם למיינד פאק רציני', 'מארוול וDC הם אחלה', 'חם פה אש', 'אני שולח את זה לAPI חיצוני', 'אחלה AI לתשובות עשית', 'coc.png'];
        this.replies['Evgeni'] = ['יאללה לאכול', 'משהו פה לא מסתדר לי', 'צאו להפסקה'];
        this.replies['Ori'] = ['מגניב!', 'אז מה למדנו היום?', 'זה אוכל את זה?', 'נחמד', 'אני עושה npm i npm start וזהו'];
        this.replies['Yuval'] = ['עוגי שיגעוגי', 'פאו צ\'יקא-וואו-וואו', 'קמהאמאה!!!', 'HERO   ore o tataeru koe ya   kassai nante   hoshikute wa nai sa!!!', 'Ka ka ka ka kachi daze!!!', 'Omae Wa Mou Shindeiru!'];
        //this.replies['Friends'] = [this.users[0].getName() + ': טוב לא חשוב הקראק נשאר אצלי', TempData.Moshe.getName() + ': קראק זה חרטא ברטא', TempData.Itay.getName() + ': אתם מפספסים אחלה קראק', TempData.Moshe.getName() + ': מישהו יכול לעזור לי עם הנוד שלי?', TempData.Itay.getName() + ': חברים חפרתם'];
        this.replies['Best Friends'] = ['תשובה גנרית'];
    };
    DB.prototype.getMessageHistory = function (senderName, receiverName, receiverType) {
        var sender = this.getSingleUser(senderName);
        var receiver;
        if (receiverType === "group") {
            receiver = this.getSingleGroup(receiverName);
        }
        else {
            receiver = this.getSingleUser(receiverName);
        }
        var convo = this.getConversation(sender, receiver);
        //erase the seconds from the time displayed
        // for (let message of convo) {
        //     message.timeSent = message.timeSent.substring(0,5);
        // }
        return convo;
    };
    DB.prototype.getConversation = function (sender, receiver) {
        var messages = DB.readFromJson("Messages");
        if (messages[sender.getName()][receiver.getName()]) {
            var convo = [];
            //the entity is a group and has many senders
            if (receiver.getType() === 'group') {
                var group = receiver;
                for (var _i = 0, _a = group.getGroupMembers(); _i < _a.length; _i++) {
                    var groupMember = _a[_i];
                    if (groupMember.getType() != 'group' && messages[groupMember.getName()]) {
                        if (messages[groupMember.getName()][receiver.getName()]) {
                            convo = convo.concat(messages[groupMember.getName()][receiver.getName()].val);
                        }
                    }
                }
            }
            //the entity is a single user and has only one sender and receiver
            else {
                convo = convo.concat(messages[sender.getName()][receiver.getName()].val);
                //temporary check if its the same fag talking to himself
                if (sender === receiver) { }
                else {
                    //if the receiver has a conversation of any sort
                    if (messages[receiver.getName()]) {
                        convo = convo.concat(messages[receiver.getName()][sender.getName()].val);
                    }
                }
            }
            convo.sort(this.compare);
            return convo;
        }
        return [];
    };
    DB.prototype.compare = function (a, b) {
        if (a.timeSent < b.timeSent) {
            return -1;
        }
        if (a.timeSent > b.timeSent) {
            return 1;
        }
        // a must be equal to b
        return 0;
    };
    DB.prototype.addUser = function (user) {
        user.id = this.users.length + 1;
        this.users.push(user);
        this.writeToJson("Users");
        return user;
    };
    DB.prototype.addGroup = function (group) {
        group.id = this.groups.length + 1;
        group.members = [];
        this.groups.push(group);
        this.writeToJson("Groups");
        return group;
    };
    return DB;
}());
exports.default = DB;
//# sourceMappingURL=db.js.map