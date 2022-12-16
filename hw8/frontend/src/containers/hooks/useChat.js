import { useState, createContext, useContext, useEffect } from "react";
import { message } from 'antd';
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from "../../graphql";
import { from } from "apollo-link";
// const client = new WebSocket('ws://localhost:4000');

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => { },
    sendMessage: () => { },
    clearMessages: () => { },
});

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const makeName = (name, to) => {
    return [name, to].sort().join('_');
};
const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [status, setStatus] = useState({});
    const [friend, setFriend] = useState("");
    const [startChat, { data: recieveChatBox }] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage, { data: recieveMessage }] = useMutation(CREATE_MESSAGE_MUTATION);

    const { data, loading } = useSubscription(
        MESSAGE_SUBSCRIPTION,
        {
            variables: {
                from: me,
                to: friend
            }
        }
    );

    useEffect(() => {
        if (data) {
            console.log(data.message)
            if (data.message.sender !== me) setMessages([...messages, data.message]);
        }
    }, [data])

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    useEffect(() => {
        console.log(recieveChatBox)
        if (recieveChatBox) {
            setMessages(recieveChatBox.createChatBox.messages);
        }
    }, [recieveChatBox])

    useEffect(() => {
        // console.log(recieveMessage)
        if (recieveMessage) {
            setMessages([...messages, recieveMessage.createMessage]);

        }
    }, [recieveMessage])

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {
                content: msg, duration: 0.5
            }
            switch (type) {
                case 'success':
                    message.success(content);
                    break;
                case 'error':
                default:
                    message.error(content);
                    break;
            }
        }
    }

    return (
        <ChatContext.Provider
            value={{
                status, me, signedIn, messages, setMe, setSignedIn,
                startChat, sendMessage, displayStatus, setFriend
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };