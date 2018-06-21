import DB from "../../db/db";

const db = DB.getInstance();

export function getUserById(id: number) {
    return new Promise((resolve, reject) => {
        const result = db.getUserById(id);
        resolve(result);
    });
}

export function getUserByNameXORPassword(user) {
    return new Promise((resolve, reject) => {
        const result = db.getSingleUser(user.name, user.pass);
        resolve(result);
    });
}

export function getAllUsers() {
    return new Promise((resolve, reject) => {
        const result = db.getAllUsers();
        resolve(result);
    });
}

export function addUser(user) {
    return new Promise((resolve, reject) => {
        const result = db.addUser(user);
        resolve(result);
    });
}

export function deleteUser(user) {
    return new Promise((resolve, reject) => {
        const result = db.deleteUser(user);
        resolve(result);
    });
}




