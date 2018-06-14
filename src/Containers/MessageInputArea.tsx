import * as React from 'react';
//import * as moment from 'moment';
import StateStore from './../State/StateStore'

//components imports
import MyButton from './../Components/MyButton';

interface IMessageInputAreaState {
    message: string
}

class MessageInputArea extends React.Component<{},IMessageInputAreaState> {

    inputRef: any;

    constructor(props: {}){
        super(props);

        this.inputRef = React.createRef();

        this.state = {
            message: ''
        };

        StateStore.getInstance().subscribe(()=>{
            this.setState({
                message: ''
            });
        });
    }

    updateMessage = (e: any) => {

        let message : string;
        message = e.target.value;

        this.setState((prevState: any, prop)=>{
            return {message: prevState.message = message};
        });
    };

    addMessageToBoard = () => {
        if (this.state.message.trimLeft() === ''){
            this.setState({
                message: ''
            });
            return;
        }

        let currentState = StateStore.getInstance();
        let currentUser = currentState.get('currentUser');
        let receiver = currentState.get('inChatWith');
        let message = this.state.message;

        if (message === ''){
            return;
        }

        if (receiver.getType() === 'group') {
            message = currentUser.getName() + ': ' + message;
        }

        //this.db.addMessageToAConversation(currentUser, receiver, message, moment().format("HH:mm:ss"));

        StateStore.getInstance().onStoreChanged();
    };

    addMessageViaEnter = (key : any) => {
        // if I ever implement textarea instead of input
        // if (key.shiftKey) {
        //     return;
        // }
        if (key.key === 'Enter') {
            this.addMessageToBoard();
        }
    };

    clearMessage = () => {
        this.setState({
            message: ''
        });
    };

    public render() {

        let btnClass = 'input ';
        let clickable = true;

        if (this.state.message.trimLeft() === '') {
            btnClass += 'emptyInput ';
            clickable = false;
        }
        else {
            btnClass += 'fullInput ';
            clickable = true;
        }

        return (
            <div className="InputArea">
                {/*<textarea value={this.state.message} placeholder={'הקלד הודעה כאן...'} className={'input'} onChange={this.updateMessage} ref={this.inputRef} onKeyPress={this.addMessageViaEnter} />*/}
                <input type={'text'} value={this.state.message} placeholder={'הקלד הודעה כאן...'} className={'input'} onChange={this.updateMessage} ref={this.inputRef} onKeyUp={this.addMessageViaEnter}/>
                <MyButton callbackFunc={this.addMessageToBoard} contentSTR={'Send'} className={btnClass} disabled={!clickable}/>
                <MyButton callbackFunc={this.clearMessage} contentSTR={'X'} className={btnClass} disabled={!clickable}/>
            </div>
        );
    }
}

export default MessageInputArea;