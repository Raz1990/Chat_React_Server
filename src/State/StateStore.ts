import {ServerAPI} from "./../ServerAPI";

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
                this.users = users;
            });

        this.groups = []; // this.db.getAllGroups();

        this.entities = this.users; //this.db.getAllEntities();
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