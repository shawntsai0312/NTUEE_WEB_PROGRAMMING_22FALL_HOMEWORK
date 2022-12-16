const Query = {
    // chatbox(parent, args) {
    //     return ChatBoxModel.findOne({ name: args.name })
    // }
    chatbox: async (parent, { name }, { ChatBoxModel }) => {
        let box = await ChatBoxModel.findOne({ name });
        if (!box)
            box = await new ChatBoxModel({ name }).save();
        return box;
    }
};
export default Query;