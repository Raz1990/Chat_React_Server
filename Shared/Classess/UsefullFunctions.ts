import * as DB from '../../server/db/db';

class MyFunctions {

    db = new DB.default();

    //gets an element and gives it the "active" class
    makeActive = (element: any) => {

        let workingElement = element.target;

        if (!workingElement) {
            workingElement = element;
        }

        this.removeActive();

        //add the active status to the selected element
        workingElement.classList.toggle('active');

        let chattingWith = this.db.getChatEntity(workingElement.innerText);

        return chattingWith;
    };

    removeActive(){
        //remove active status from any previous active
        let currentlyActive = document.getElementsByClassName('active');
        if (currentlyActive.length > 0) {
            currentlyActive[0].classList.toggle('active');
        }
    }

    //gets an element and expands / collapses all of its children (if have any)
    decideVisibility = (element: any) => {

        let workingElement = element.target;

        if (!workingElement) {
            workingElement = element;
        }

        let eleChildren = this.getElementChildren(workingElement);

        if (!eleChildren) {
            return;
        }

        for (let i=0; i<eleChildren.length; i++){

            let child = eleChildren[i];

            child.classList.toggle('isHidden');
            const innerChildHidden = this.areElementsHidden(this.getElementChildren(child));
            if (child.classList.contains('isHidden') && !innerChildHidden) {
                this.decideVisibility(child);
            }
        }

        // for (let child of eleChildren) {
        //     child.classList.toggle('isHidden');
        //     const innerChildHidden = this.areElementsHidden(this.getElementChildren(child));
        //     if (child.classList.contains('isHidden') && !innerChildHidden) {
        //         this.decideVisibility(child);
        //     }
        // }
    };

    //gets an array of elements, and returns true if one of them has isHidden class
    areElementsHidden(childrenArray: any) {
        for (const child of childrenArray) {
            if (!child.classList.contains('isHidden')) {
                return false;
            }
        }
        return true;
    }

    getElementParent(element: any) {
        //classList[3] = childOf_*** (parent group)
        //substring(8) = just the ***
        if (element.classList[3]) {
            const className = element.classList[3].substring(8);
            const parent = document.getElementsByClassName(className)[0];
            return parent;
        }
        return null;
    }

    getElementChildren(element: any) {
        const className = element.classList[1];
        const children = document.getElementsByClassName('childOf_' + className);
        return children;
    }

    setUpKeysEvents(element: any){
        element.addEventListener('keydown', this.decideAction);
    }

    decideAction = (event: any) => {
        const currentlyActive = document.getElementsByClassName('active')[0];
        let liChildren, liParent;
        if (currentlyActive) {
            liChildren = this.getElementChildren(currentlyActive);
            liParent = this.getElementParent(currentlyActive);
        }

        switch (event.key) {
            case 'ArrowDown':
                this.dealWithDown(currentlyActive,liChildren,liParent);
                break;
            case 'ArrowUp':
                this.dealWithUp(currentlyActive);
                break;
            case 'Enter':
                this.dealWithEnter(currentlyActive, liChildren);
                break;
            case 'ArrowRight':
                this.dealWithRight(currentlyActive, liChildren);
                break;
            case 'ArrowLeft':
                this.dealWithLeft(currentlyActive, liChildren, liParent);
                break;
        }
    };

    dealWithDown = (currentlyActive: any, liChildren: any, liParent: any) => {
        ///FEATURE
        //Check if there is a li to active if none are active
        const allLis = document.getElementsByTagName('li');
        const firstLi = allLis[0];
        if (!currentlyActive && firstLi){
            this.makeActive(firstLi);
        }

        //if nothing is active, and no li in sight, simply go back
        if (!currentlyActive) {
            return;
        }

        let eleToActive, idNow;

        //check if its a group
        if (currentlyActive.classList.contains('group')) {
            //get its children
            liChildren = this.getElementChildren(currentlyActive);
        }
        //if it's a child of another element, get the parent
        if (currentlyActive.classList.contains('childElement')) {
            liParent = this.getElementParent(currentlyActive);
        }

        idNow = parseInt(currentlyActive.id);

        const lastLi = allLis[allLis.length-1];

        if (idNow === parseInt(lastLi.id)) {
            return;
        }

        //if has children and
        //those children are visible and can be moved to
        if (liChildren && !this.areElementsHidden(liChildren)) {
            eleToActive = liChildren[0];
        }
        else {
            if (liParent) {
                let parentsChildren = this.getElementChildren(liParent);
                let lastChild = parentsChildren[parentsChildren.length - 1];
                //if i'm the last active child
                if (parseInt(lastChild.id) === idNow) {
                    //take my parent's id
                    idNow = parseInt(liParent.id);
                }
            }
            eleToActive = document.getElementById((idNow + 1).toString());
        }

        this.makeActive(eleToActive);
    };

    dealWithUp = (currentlyActive: any) => {
        let eleToActive, idNow, previousLi;

        idNow = parseInt(currentlyActive.id);

        if (idNow === 1) {
            return;
        }

        previousLi = currentlyActive.previousSibling;

        do {
            eleToActive = previousLi;
            if (eleToActive.classList.contains('isHidden')) {
                previousLi = previousLi.previousSibling;
            }
        }while (eleToActive.classList.contains('isHidden'));

        this.makeActive(eleToActive);
    };

    dealWithLeft = (currentlyActive: any, liChildren: any, liParent: any) => {

        if (liChildren) {
            if (!this.areElementsHidden(liChildren)) {
                this.decideVisibility(currentlyActive);
            }
            else if (liParent) {
                if (this.areElementsHidden(this.getElementChildren(liParent))) {
                    this.decideVisibility(liParent);
                }
                this.makeActive(liParent);
            }
        }
        else if (liParent) {
            if (this.areElementsHidden(this.getElementChildren(liParent))) {
                this.decideVisibility(liParent);
            }
            else {
                this.makeActive(liParent);
            }
        }
    };

    dealWithRight = (currentlyActive: any, liChildren: any) => {
        //if it has children
        if (liChildren.length > 0) {
            //if any of my children are hidden, i will hide myself
            if (this.areElementsHidden(liChildren)) {
                this.decideVisibility(currentlyActive);
            }
            //makeActive(liChildren[0]);
        }
    };

    dealWithEnter = (currentlyActive: any, liChildren: any) => {
        //if it has children
        if (liChildren.length > 0) {
            this.decideVisibility(currentlyActive);
        }
    };
}

export default MyFunctions;