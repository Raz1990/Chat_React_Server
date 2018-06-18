import {ServerAPI} from "./../ServerAPI";
import MyFunctions from "../Classess/UsefullFunctions";

interface IStateSore {
    state: {};
    set(key:string, val: string): any
    get(key:string): void;
}

class StateStore implements IStateSore{

    users;
    groups;
    entities;
    listeners: Function[];

    constructor(){
        this.listeners = [];

        ServerAPI.getUsers()
            .then((users) => {
                users = MyFunctions.Userify(users);
                this.users = users;
                this.state["allUsers"] = this.users;

                ServerAPI.getGroups()
                    .then((groups) => {
                        groups = MyFunctions.Groupify(groups);
                        this.groups = groups;
                        this.state["allGroups"] = this.groups;
                        this.entities = this.createEntities();
                        this.state["allEntities"] = this.entities;
                    });
            });
    }

    createEntities() {
        let entityArray = [];

        entityArray = entityArray.concat(this.groups).concat(this.users);

        return entityArray;
    }

    state: {} = {
        allUsers: this.users,
        allGroups: this.groups,
        allEntities: this.entities,
        currentUser: null,
        inChatWith: null
    };

    subscribe(listener: any){
        return this.listeners.push(listener);
    }

    unsubscribe(index: number){
        this.listeners.splice(index,1);
    }

    set(key:string, val:any){
        this.state[key] = val;
        this.onStoreChanged();
    }

    get(key:string){
        return this.state[key] || null;
    }

    onStoreChanged(){
        for(const listener of this.listeners){
            listener();
        }
    }

    static instance: StateStore;

    static getInstance(){
        if (!StateStore.instance){
            StateStore.instance = new StateStore();
        }

        return StateStore.instance;
    }
}

export default StateStore;