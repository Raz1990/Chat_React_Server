import * as express from 'express';

const groupsRouter = express.Router();

groupsRouter.get('/', (req, res) => {
    res.send('Hello world');
});

export default groupsRouter;