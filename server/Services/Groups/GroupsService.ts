import DB from "../../db/db";

const db = DB.getInstance();

export function getAllGroups() {
    return new Promise((resolve, reject) => {
        const result = _getAllGroups();
        resolve(result);
    });
}

function _getAllGroups() {
    return db.getAllGroups();
}

export async function getGroupById(id: number) {
    return new Promise((resolve) => {
        const result = 1; //COMPLETE db.getUserById(id);
        resolve(result);
    });
}

export function addGroup(group) {
    return new Promise((resolve, reject) => {
        const result = db.addGroup(group);
        resolve(result);
    });
}

