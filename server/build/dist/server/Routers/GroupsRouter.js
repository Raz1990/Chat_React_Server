"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var groupsRouter = express.Router();
groupsRouter.get('/', function (req, res) {
    res.send('Hello world');
});
exports.default = groupsRouter;
//# sourceMappingURL=GroupsRouter.js.map