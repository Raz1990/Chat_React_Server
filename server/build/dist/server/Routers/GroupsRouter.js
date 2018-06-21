"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Controllers = require("../Controllers");
var groupsRouter = express.Router();
groupsRouter.get('/', Controllers.GroupsController.getAllGroups);
groupsRouter.post('/addGroup', Controllers.GroupsController.addGroup);
exports.default = groupsRouter;
//# sourceMappingURL=GroupsRouter.js.map