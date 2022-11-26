import mongoose from 'mongoose';
const Schema = mongoose.Schema

/******* Message Schema *******/
const MessageSchema = new Schema({
    sender: { type: String, required: [true, 'Sender field is required.'] },
    body: { type: String, required: [true, 'Body field is required.'] },
});
const MessageModel = mongoose.model('Message', MessageSchema);
/******* ChatBox Schema *******/
const ChatBoxSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    users: [{ type: String, required: [true, 'User field is required.']}],
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);
export {MessageModel, ChatBoxModel};