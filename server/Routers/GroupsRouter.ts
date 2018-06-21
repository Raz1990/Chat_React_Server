import * as express from 'express';
import * as Controllers from "../Controllers";

const groupsRouter = express.Router();

groupsRouter.get('/', Controllers.GroupsController.getAllGroups);

groupsRouter.post('/addGroup', Controllers.GroupsController.addGroup);

export default groupsRouter;