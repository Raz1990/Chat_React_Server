import * as express from 'express';
import * as Controllers from "../Controllers";

const groupsRouter = express.Router();

groupsRouter.get('/', Controllers.GroupsController.getAllGroups);

export default groupsRouter;