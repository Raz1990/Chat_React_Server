import * as services from './../../Services';

export async function getUserById(req , res) {
    try {
        const user = await services.UsersService.getUserById(req.params.id);
        res.json(user);
    }
    catch (e) {
        res.send('Bad request');
    }
}

export async function getUserByNameXORPassword(req , res) {
    try {
        const user = await services.UsersService.getUserByNameXORPassword(req.body);
        res.json(user);
    }
    catch (e) {
        res.send('Bad request');
    }
}

export async function getAllUsers(req , res) {
    try {
        const users = await services.UsersService.getAllUsers();
        res.json(users);
    }
    catch (e) {
        res.send('Bad request');
    }
}
