import mongoose from 'mongoose';
const Schema = mongoose.Schema

/******* ChatBox Schema *******/
const ChatBoxSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    messages: [{ type: Object, ref: 'Message' }],
});
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);
export default ChatBoxModel;