//is positioned on the left part of the screen, showing every group and user entities

import * as React from 'react';

import Header from './Header';
import StateStore from "../State/StateStore";
import ICanChat from "../Interfaces/ChatEntity";
import * as MyFunctions from './../Classess/UsefullFunctions';
import {User} from './../Classess/User';
import {Group} from "../Classess/Group";

interface ITreeState {
    currentUser : User;
    entities: ICanChat[];
}

interface ITreeProps {
}

class ChatEntitiesTree extends React.Component<ITreeProps,ITreeState> {

    myFuncs = new MyFunctions.default();
    ulTree: any;

    constructor(props: ITreeProps){
        super(props);

        this.ulTree = React.createRef();

        this.state = {
            currentUser : StateStore.getInstance().get('currentUser'),
            entities : StateStore.getInstance().get('allEntities')
        };

        StateStore.getInstance().subscribe(()=>{
            this.setState({
                currentUser : StateStore.getInstance().get('currentUser'),
                entities : StateStore.getInstance().get('allEntities')
            });
        });
    }

    singleLiCreate(item : ICanChat, idValue? : number, childElement? : any, parentLiClassName? : string, repeatSpaces? : number){

        childElement = childElement || false;

        idValue = idValue || 1;

        parentLiClassName = parentLiClassName || "";

        repeatSpaces = repeatSpaces || 0;

        const itemNameForClass = item.getName().replace(' ', '_');
        let li = {
            innerHTML: '',
            className : '',
            id : '',
            style: {}
        };
        li.innerHTML = item.getName();
        li.className += item.getType() + ' ' + itemNameForClass + ' ';
        li.id = idValue.toString();
        li.style = { 'textIndent' : repeatSpaces +'em'};

        if (childElement) {
            li.className += 'childElement childOf_' + parentLiClassName + ' isHidden ';
        }

        return li;

    }

    createListItems(items : ICanChat[], liList? : any[], repeatSpaces? : number, idValue? : number, child? : boolean, parentLiClassName? : string){

        liList = liList || [];

        child = child || false;

        repeatSpaces = repeatSpaces || 0;

        idValue = idValue || 1;

        for (let item of items) {

            if (item.getType() === 'group'){
                const group_item = item as Group;
                const parent_group = group_item.getParentGroup();
                if (parent_group && (idValue > 1 && idValue < items.length)){
                    continue;
                }
            }

            liList.push(this.singleLiCreate(item, idValue, child, parentLiClassName, repeatSpaces));

            //if it's a group with items in it
            if (item.getItems().length > 0) {
                this.createListItems(item.getItems(), liList,repeatSpaces + 1, items.length + idValue, true, item.getName().replace(' ', '_'));
            }

            idValue++;
        }


        liList = liList.map((item, idx) => {
            return <li style={item.style} onClick={this.makeActive} onDoubleClick={this.myFuncs.decideVisibility} className={item.className} id={item.id} key={idx}> {item.innerHTML} </li>;
        });

        return liList;
    }

    makeActive(element){
        const chattingWith = this.myFuncs.makeActive(element);
        StateStore.getInstance().set('inChatWith', chattingWith);
    }

    componentDidMount() {
        this.myFuncs.setUpKeysEvents(this.ulTree.current);
    }

    public render() {

        let entitiesTree = [];

        if (this.state.currentUser){
            entitiesTree = this.createListItems(this.state.entities);
        }

        return (
            <div className={'left'}>

                <Header/>

                <ul className="tree" tabIndex={0} ref={this.ulTree}>

                    {entitiesTree}

                </ul>

            </div>
        );
    }
}

export default ChatEntitiesTree;
