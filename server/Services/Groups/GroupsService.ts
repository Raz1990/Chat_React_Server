import * as DB from "../../db/db";

const db = new DB.default();

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
        const result = _getGroupById(id);

        resolve(result);
    });
}

function _getGroupById(id) {
    return id;
}
