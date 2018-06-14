import * as services from './../../Services';

export default async function f(req , res) {
    const user = await services.GroupsService(req.params.id);

    res.json(user);
}
