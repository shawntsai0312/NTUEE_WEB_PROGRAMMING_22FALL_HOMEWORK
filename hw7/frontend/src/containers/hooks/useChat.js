import { useState, createContext, useContext, useEffect } from "react";
import { message } from 'antd';
const client = new WebSocket('ws://localhost:4000');

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

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [status, setStatus] = useState({});

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

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

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const { type, payload } = JSON.parse(data);

        switch (type) {
            case "init": {
                console.log(payload);
                setMessages(payload);
                break;
            }
            case "message": {
                setMessages([...messages, payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            default: break;
        }
    }
    const startChat = (name, to) => {
        if (!name || !to) throw new Error("name or to required.");
        console.log("startChat")
        sendData({ type: 'CHAT', payload: { name, to } });
    }
    const sendMessage = (name, body) => {
        if (!name || !body) throw new Error("name or to or body required.");
        sendData({ type: 'MESSAGE', payload: { name, body } });
    }
    const clearMessages = () => {
        sendData(["clear"]);
    };
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    return (
        <ChatContext.Provider
            value={{
                status, me, signedIn, messages, setMe, setSignedIn,
                startChat, sendMessage, clearMessages, displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };