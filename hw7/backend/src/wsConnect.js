import { MessageModel, ChatBoxModel } from "./models/chatbox.js";
const chatBoxes = {};//active chatboxes
const makeName =
    (name, to) => { return [name, to].sort().join('_'); };
const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
    // console.log(box);
    return box.populate(["users", { path: 'messages', populate: 'sender' }]);
};
const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData({ type: "status", payload }, ws);
}

export default {
    onMessage: (ws) => (
        async (byteString) => {
            const { data } = byteString;
            const { type, payload } = JSON.parse(data);
            // console.log(type,payload)
            switch (type) {
                case 'CHAT': { // open a chatbox
                    const { name, to } = payload;
                    // delete ws from old chatbox
                    if (ws.box !== "" && chatBoxes[ws.box])
                        chatBoxes[ws.box].delete(ws);
                    // current chatbox name
                    const chatBoxName = makeName(name, to);
                    // make sure the chatbox exist in db
                    await validateChatBox(chatBoxName, [name, to]);
                    // add ws to new chatbox
                    if (!chatBoxes[chatBoxName])
                        chatBoxes[chatBoxName] = new Set();
                    chatBoxes[chatBoxName].add(ws);
                    ws.box = chatBoxName;
                    // TODO: find chatbox with name ws.box, send all the messages of the chatbox to ws
                    /* Hint
                        * db 裡存的東西如果是 reference, 提取時需要 populate
                        ChatBoxModel.findOne({filter}).populate('what you want to populate').exec((_,res)=>{
                            sendData({your payload}, ws);
                        })
                        * 確認好payload的形式和前端接收的形式相同
                    */
                    ChatBoxModel.findOne({ name: ws.box }).populate('messages')
                        .exec((req, res) => {
                            // console.log(res)
                            sendData({ type: 'init', payload: res.messages }, ws)
                        })
                    break;
                };
                case 'MESSAGE': { // send a message
                    const { name, body } = payload;
                    // Save payload to DB
                    const message = new MessageModel({ sender: name, body })
                    try {
                        await message.save();
                        ChatBoxModel.findOne({ name: ws.box }).populate("messages")
                            .exec((req, res) => {
                                console.log(res)
                                res.messages.push(message);
                                res.save();
                            })
                        ChatBoxModel.findOne({ name: ws.box })
                            .exec((req, res) => {
                                console.log(res)
                            })

                    }
                    catch (e) {
                        throw new Error
                            ("Message DB save error: " + e);
                    }
                    // Respond to client
                    // TODO: send message and status to all the client in ws.box
                    for (let i of chatBoxes[ws.box]) {
                        sendData({ type: "message", payload: { sender: name, body: body } }, i);
                        sendStatus({ type: "success", msg: "sent" }, i)
                    }
                    break;
                }
                default: break;
            }
        }
    )
}