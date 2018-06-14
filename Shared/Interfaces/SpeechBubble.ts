import IChatEntity from "./ChatEntity";

export default interface ISpeechBubble {
    content: string,
    sender: IChatEntity,
    receiver: IChatEntity,
    timeSent: string,
}