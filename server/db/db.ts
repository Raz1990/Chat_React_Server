import * as fs from 'fs';

import ICanChat from "../../Shared/Interfaces/ChatEntity";

class DB {

    users: ICanChat[];
    groups: ICanChat[];

    constructor() {
        let fileName = "Users";
        this.users = DB.readFromJson(fileName).users;
        fileName = "Groups";
        this.groups = DB.readFromJson(fileName).groups;
    }

    static readFromJson(fileName: string) {
        const data = fs.readFileSync(`${__dirname}/JSONData/${fileName}Data.json`,"UTF-8");
        return JSON.parse(data);
    }

    writeToJson(fileName: string) {
        let data;
        switch (fileName) {
            case "Users":
                data = this.users;
                break;
            case "Groups":
                data = this.groups;
                break;
        }
        fs.writeFileSync(`${__dirname}/JSONData/${fileName}Data.json`, JSON.stringify(data),"UTF-8");
    }

    //static users = TempData.allUsers;
    //static groups = TempData.allGroups;

    getAllEntities() {
        let entityArray : ICanChat[] = [];

        entityArray = entityArray.concat(this.groups).concat(this.users);

        return entityArray;
    }

    getAllUsers(){
        return this.users;
    }

    getAllGroups(){
        return this.groups;
    }

    getSingleUser(userName: string, password?: string) {
        let foundUser;
        console.log(this.users);
        if (password) {
            try {
                foundUser = this.users.find(this.finding);
                console.log(foundUser);
            }catch (e) {
                console.log("ERROR",e);
            }
        }
        else {
            foundUser = this.users.find(o => o.getName() === userName);
        }
        console.log(foundUser);
        return foundUser;
    }

    finding = (o) => {
        return o.getName() === "Raz" && o.getPassword() === "rrr";
    };

    getUserById(id: number) {
        let foundUser = this.users.find(o => o.getId() === id);
        return foundUser;
    }

    getSingleGroup(groupName: string) {
        return this.groups.find(o => o.getName() === groupName);
    }

    getChatEntity(name: string) {
        let entity;
        entity = this.users.find(o => o.getName() === name);
        if (!entity){
            entity = this.groups.find(o => o.getName() === name);
        }

        return entity;
    }

    static addMessageToAConversation(sender: ICanChat, receiver: ICanChat, content: string, time: string){
        //TempData.addConversation(sender, receiver, content, time,true);
    }

    static getMessageHistory(sender: ICanChat, receiver: ICanChat) {
        let convo = []; //TempData.getConversation(sender,receiver);

        //erase the seconds from the time displayed
        // for (let message of convo) {
        //     message.timeSent = message.timeSent.substring(0,5);
        // }

        return convo;
    }
}

export default DB;