import * as express from 'express';
import * as Controllers from "../Controllers";

const groupsRouter = express.Router();

groupsRouter.get('/', Controllers.GroupsController.getAllGroups);

groupsRouter.post('/addGroup', Controllers.GroupsController.addGroup);

groupsRouter.delete('/deleteGroup', Controllers.GroupsController.deleteGroup);

groupsRouter.post('/moveGroups', Controllers.GroupsController.moveGroups);

groupsRouter.post('/addUserToGroup', Controllers.GroupsController.addUserToGroup);

export default groupsRouter;