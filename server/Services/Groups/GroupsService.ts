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

export function updateGroup(group) {
    return new Promise((resolve, reject) => {
        const result = db.updateGroup(group);
        resolve(result);
    });
}

export function addUserToGroup(addingObject) {
    return new Promise((resolve, reject) => {
        const result = db.addUserToGroup(addingObject.groupName, addingObject.userName);
        resolve(result);
    });
}

export function removeUserFromGroup(removingObject) {
    return new Promise((resolve, reject) => {
        const result = db.removeUserFromGroup(removingObject.groupName, removingObject.userName);
        resolve(result);
    });
}

export function moveGroups(groups) {
    return new Promise((resolve, reject) => {
        const result = db.moveGroups(groups.host, groups.mover);
        resolve(result);
    });
}

export function deleteGroup(group) {
    return new Promise((resolve, reject) => {
        const result = db.deleteGroup(group,group.flatten);
        resolve(result);
    });
}
