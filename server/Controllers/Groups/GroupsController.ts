import * as services from './../../Services';

export async function getAllGroups(req , res) {
    try {
        const groups = await services.GroupsService.getAllGroups();
        res.json(groups);
    }
    catch (e) {
        console.log('GET ALL GROUPS ERROR',e);
        res.send('Bad request', e);
    }
}
