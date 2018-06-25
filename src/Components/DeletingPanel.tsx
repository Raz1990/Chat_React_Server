import * as React from 'react';

import Modal from "./../Components/Modal";

interface IDelProps {
    styles;
    submitCallback;
    cancelCallback;
}

interface IDelState {
}

class DeletingPanel extends React.Component<IDelProps,IDelState> {

    constructor(props: IDelProps){
        super(props);

        this.state = {};
    }

    AddInteraction(){
        return (
            <div>
                <p style={this.props.styles.p}>
                    <label style={this.props.styles.label} htmlFor="user_name">Are you sure you want to delete?</label>
                 </p>
            </div>
        );
    }

    public render() {

        const divSelected = this.AddInteraction();

        return (
            <Modal style={this.props.styles.modal}>
                {divSelected}
                <div className={"buttonsWrapper"}>
                    <button style={this.props.styles.button} onClick={this.props.submitCallback}>Yes, delete</button>
                    <button style={this.props.styles.cancelButton} onClick={this.props.cancelCallback}>Cancel</button>
                </div>
            </Modal>
        )
    }
}

export default DeletingPanel;
