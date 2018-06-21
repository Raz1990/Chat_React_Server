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

export async function addGroup(req , res) {
    try {
        const group = await services.GroupsService.addGroup(req.body);
        res.json(group);
    }
    catch (e) {
        res.send('Bad request');
    }
}
