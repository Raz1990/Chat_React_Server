import * as DB from "../../db/db";

const db = new DB.default();

export function getUserById(id: number) {
    return new Promise((resolve, reject) => {
        const result = _getUserById(id);
        resolve(result);
    });
}

function _getUserById(id) {
    return db.getUserById(id);
}

export function getUserByNameXORPassword(user) {
    return new Promise((resolve, reject) => {
        const result = _getUserByNameXORPassword(user.name, user.pass);
        resolve(result);
    });
}

function _getUserByNameXORPassword(name: string, pass?: string) {
    return db.getSingleUser(name, pass);
}

export function getAllUsers() {
    return new Promise((resolve, reject) => {
        const result = _getAllUsers();
        resolve(result);
    });
}

function _getAllUsers() {
    return db.getAllUsers();
}