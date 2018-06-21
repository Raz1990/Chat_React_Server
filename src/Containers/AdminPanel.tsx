import * as React from 'react';

import MyButton from "../Components/MyButton";
import AddingPanel from "../Components/AddingPanel";
import DeletingPanel from "../Components/DeletingPanel";
import styles from "./../Styles/styles";
import {ServerAPI} from "../ServerAPI";
import StateStore from "../State/StateStore";
import MyFunctions from "../Classess/UsefullFunctions";
//import MyFunctions from "../Classess/UsefullFunctions";

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
            case "Add":
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
        this.toggleModal("delete");

    };

    addingSomething = (object, type) => {
        if (type === 'user'){
            ServerAPI.createUser(object)
                .then((currentUser) => {
                if (currentUser){
                    currentUser = MyFunctions.UserifyOne(currentUser);
                    alert('added ' + currentUser.getName() + " successfully");

                    const state = StateStore.getInstance();

                    let currentUsers = state.get("allUsers");
                    currentUsers.push(currentUser);
                    state.set("allUsers", currentUsers);
                    state.set("allEntities", StateStore.getInstance().createEntities());

                    state.onStoreChanged();

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
                        currentGroup = MyFunctions.Groupify([currentGroup])[0];
                        alert('added ' + currentGroup.getName() + " successfully");

                        const state = StateStore.getInstance();

                        let currentGroups = state.get("allGroups");
                        currentGroups.push(currentGroup);
                        state.set("allGroups", currentGroups);
                        state.set("allEntities", StateStore.getInstance().createEntities());

                        state.onStoreChanged();

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

    deletingSomething = (object, type) => {
        if (type === 'user'){
            ServerAPI.deleteUser(object)
                .then((currentUser) => {
                    if (currentUser){
                        currentUser = MyFunctions.UserifyOne(currentUser);
                        alert('deleted ' + currentUser.getName() + " successfully");

                        const state = StateStore.getInstance();

                        let currentUsers = state.get("allUsers");
                        const index = currentUsers.indexOf(currentUser);
                        currentUsers.splice(index, 1);

                        state.set("allUsers", currentUsers);
                        state.set("allEntities", StateStore.getInstance().createEntities());

                        state.onStoreChanged();

                        if (state.get('chatElement')){
                            state.set('chatElement',null);
                        }
                    }
                    else {
                        alert('Cant delete!');
                    }
                });
        }
        else {
            /*ServerAPI.deleteGroup(object)
                .then((currentGroup) => {
                    if (currentGroup){
                        currentGroup = MyFunctions.Groupify([currentGroup])[0];
                        alert('added ' + currentGroup.getName() + " successfully");

                        const state = StateStore.getInstance();

                        let currentGroups = state.get("allGroups");
                        currentGroups.push(currentGroup);
                        state.set("allGroups", currentGroups);
                        state.set("allEntities", StateStore.getInstance().createEntities());

                        state.onStoreChanged();

                        if (state.get('chatElement')){
                            MyFunctions.makeActive(state.get('chatElement'));
                        }
                    }
                    else {
                        alert('Cant add!');
                    }
                });*/
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
        }

        return (
        <div className={'adminPanel'}>
            <MyButton contentSTR={"Add"} callbackFunc={this.panelDistributor} disabled={false} className={"adminButton addButton"}/>
            <MyButton contentSTR={"Remove"} callbackFunc={this.panelDistributor} disabled={this.state.disabled} className={"adminButton deleteButton"}/>
            <MyButton contentSTR={"Update"} callbackFunc={this.panelDistributor} disabled={this.state.disabled} className={"adminButton updateButton"}/>

            {modal ? modal : <div/>}
        </div>
        )
    }
}

export default AdminPanel;
