import * as React from 'react';

import MyButton from "../Components/MyButton";
import AddingPanel from "../Components/AddingPanel";
import DeletingPanel from "../Components/DeletingPanel";
import UpdatingPanel from "../Components/UpdatingPanel";
import styles from "./../Styles/styles";
import {ServerAPI} from "../ServerAPI";
import StateStore from "../State/StateStore";
import MyFunctions from "../Classess/helpers";

interface IPanelState {
    panel: string
    disabled: boolean
}

interface IPanelProps {
}

class AdminPanel extends React.Component<IPanelProps,IPanelState> {

    constructor(props: IPanelProps){
        super(props);

        let disabled = true;

        if (StateStore.getInstance().get('chatElement')) {
            disabled = false;
        }

        this.state = {
            panel: "",
            disabled: disabled
        };

        StateStore.getInstance().subscribe(()=>{

            let disabled = true;

            if (StateStore.getInstance().get('chatElement')) {
                disabled = false;
            }

            this.setState({
                disabled : disabled
            });
        });

    }

    toggleModal = (panel) => {
        this.setState({
            panel: panel
        });
    };

    panelDistributor = (action) => {
        let currentlyActive = document.getElementsByClassName('active');
        let type;
        if (currentlyActive.length === 0) {
            type = "";
        }
        else {
            //group or user
            type = currentlyActive[0].classList[0];

        }

        switch (action.target.innerText){
            case "add":
                this.toggleModal("add");
                break;
            case "Remove":
                this.removePanel(type);
                break;
            case "Update":
                this.updatePanel(type);
                break;
        }
    };

    removePanel = (type: string) =>{
        this.toggleModal("delete");
    };

    updatePanel = (type: string) => {
        this.toggleModal("update");

    };

    addingSomething = (object, type) => {
        const state = StateStore.getInstance();
        if (type === 'user'){
            ServerAPI.createUser(object)
                .then((currentUser) => {
                if (currentUser){
                    alert('added ' + currentUser.user_name + " successfully");

                    let currentUsers = state.get("allUsers");
                    currentUsers.push(currentUser);
                    state.set("allUsers", currentUsers);
                    state.set("allEntities", StateStore.getInstance().createEntities());

                    //state.onStoreChanged();

                    if (state.get('chatElement')){
                        MyFunctions.makeActive(state.get('chatElement'));
                    }
                }
                else {
                    alert('Cant add!');
                }
            });
        }
        else {
            ServerAPI.createGroup(object)
                .then((currentGroup) => {
                    if (currentGroup){
                        //currentGroup = MyFunctions.Groupify([currentGroup])[0];
                        alert('added ' + currentGroup.group_name + " successfully");

                        let currentGroups = state.get("allGroups");
                        currentGroups.push(currentGroup);
                        state.set("allGroups", currentGroups);
                        state.set("allEntities", StateStore.getInstance().createEntities());

                        //state.onStoreChanged();

                        if (state.get('chatElement')){
                            MyFunctions.makeActive(state.get('chatElement'));
                        }
                    }
                    else {
                        alert('Cant add!');
                    }
                });
        }
        this.cancelModal();
    };

    deletingSomething = () => {
        const state = StateStore.getInstance();
        const object = MyFunctions.getChatEntity(state.get('chatElement').innerText);
        let type;
        if (object.members) {
            type = "group";
        }
        else {
            type = "user";
        }

        if (type === 'user'){
            ServerAPI.deleteUser(object)
                .then((currentUser) => {
                    if (currentUser){
                        //currentUser = MyFunctions.UserifyOne(currentUser);
                        alert('deleted ' + currentUser.user_name + " successfully");

                        if (state.get('chatElement')){
                            state.set('inChatWith',null);
                            state.set('chatElement',null);
                        }

                        let currentUsers = state.get("allUsers");
                        const index = currentUsers.indexOf(currentUser);
                        currentUsers.splice(index, 1);

                        state.set("allUsers", currentUsers);
                        state.set("allEntities", StateStore.getInstance().createEntities());

                        //state.onStoreChanged();
                    }
                    else {
                        alert('Cant delete!');
                    }
                });
        }
        else {
            ServerAPI.deleteGroup(object)
                .then((currentGroup) => {
                    if (currentGroup){
                        //currentGroup = MyFunctions.Groupify([currentGroup])[0];
                        alert('deleted ' + currentGroup.group_name + " successfully");

                        if (state.get('chatElement')){
                            state.set('inChatWith',null);
                            state.set('chatElement',null);
                        }

                        let currentGroups = state.get("allGroups");
                        const index = currentGroups.indexOf(currentGroup);
                        currentGroups.splice(index, 1);

                        state.set("allGroups", currentGroups);
                        state.set("allEntities", StateStore.getInstance().createEntities());

                        //state.onStoreChanged();
                    }
                    else {
                        alert('Cant delete!');
                    }
                });
        }
        this.cancelModal();
    };

    updateSomething = (object, type) => {
        const state = StateStore.getInstance();
        if (type === 'user'){
            ServerAPI.updateUser(object)
                .then((currentUsers) => {
                    if (currentUsers){
                        alert("updated successfully!");
                        state.set("allUsers", currentUsers);
                        state.set("allEntities", StateStore.getInstance().createEntities());
                    }
                    else {
                        alert('Cant update!');
                    }
                });
        }
        else {
            switch (object.action){
                case "updateName":
                    ServerAPI.updateGroup(object)
                        .then((currentGroup) => {
                            if (currentGroup){

                            }
                            else {
                                alert('Cant update!');
                            }
                        });
                    break;
                case "addGroupToMe":
                    ServerAPI.addGroupToGroup(object.whoParent, object.movingGroup)
                        .then((currentGroups) => {
                            if (currentGroups){
                                alert("updated successfully!");
                                state.set("allGroups", currentGroups);
                                state.set("allEntities", StateStore.getInstance().createEntities());
                            }
                            else {
                                alert('Cant move!');
                            }
                        });
                    break;
                case "moveMeToGroup":
                    ServerAPI.addGroupToGroup(object.whoParent, object.movingGroup)
                        .then((currentGroups) => {
                            if (currentGroups){
                                alert("updated successfully!");
                                state.set('chatEntity', null);
                                state.set('inChatWith', null);
                                state.set("allGroups", currentGroups);
                                state.set("allEntities", StateStore.getInstance().createEntities());
                            }
                            else {
                                alert('Cant move!');
                            }
                        });
                    break;
                case "addUserToMe":
                    ServerAPI.addUserToGroup(object.group_name, object.addedUser)
                        .then((currentGroups) => {
                            if (currentGroups){
                                alert("updated successfully!");
                                state.set("allGroups", currentGroups);
                                state.set("allEntities", StateStore.getInstance().createEntities());
                            }
                            else {
                                alert('Cant move!');
                            }
                        });
                    break;
            }
        }
        this.cancelModal();
    };

    cancelModal = () => {
        this.setState({
            panel: ""
        });
    };

    public render() {

        let modal = null;

        switch (this.state.panel) {
            case "add":
                modal = <AddingPanel styles={styles} cancelCallback={this.cancelModal} submitCallback={this.addingSomething} AddTypes={["user", "group"]}/>;
                break;
            case "delete":
                modal = <DeletingPanel styles={styles} cancelCallback={this.cancelModal} submitCallback={this.deletingSomething}/>;
                break;
            case "update":
                let workingObject = MyFunctions.getUserOrGroup(MyFunctions.getChatEntity(StateStore.getInstance().get('chatElement').innerText));
                modal = <UpdatingPanel styles={styles} updateObject={workingObject} groups={StateStore.getInstance().get("allGroups")} users={StateStore.getInstance().get("allUsers")} cancelCallback={this.cancelModal} submitCallback={this.updateSomething}/>;
                break;
        }

        return (
        <div className={'adminPanel'}>
            <MyButton contentSTR={"add"} callbackFunc={this.panelDistributor} disabled={false} className={"adminButton addButton"}/>
            <MyButton contentSTR={"Remove"} callbackFunc={this.panelDistributor} disabled={this.state.disabled} className={"adminButton deleteButton"}/>
            <MyButton contentSTR={"Update"} callbackFunc={this.panelDistributor} disabled={this.state.disabled} className={"adminButton updateButton"}/>

            {modal ? modal : <div/>}
        </div>
        )
    }
}

export default AdminPanel;
