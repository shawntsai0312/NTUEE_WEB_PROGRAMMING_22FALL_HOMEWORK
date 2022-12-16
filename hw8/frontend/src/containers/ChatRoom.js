import styled from 'styled-components';
import Title from "../components/Title";
import { Input, Tabs } from 'antd';
import { useChat } from './hooks/useChat';
import { useRef, useState, useEffect } from 'react';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { render } from '@testing-library/react';

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;
const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
  const { me, messages, displayStatus, sendMessage, startChat, setFriend } = useChat();
  const [body, setBody] = useState('');
  const [msgSent, setMsgSent] = useState(false);
  const [chatBoxes, setChatBoxes] = useState([]);
  const [activeKey, setActiveKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const msgFooter = useRef(null);

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView
      ({ behavior: 'smooth', block: "start" });
  };

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);

  useEffect(() => {
    // when messages changes:
    /* TODO: update chatbox contents
      setChatBoxes(updated ChatBoxes)
      setMsgSent(true)
    */
    if (activeKey) {
      const chat = renderChat(messages);
      const index = chatBoxes.findIndex(({ key }) => key === activeKey);
      if (index === -1) {
        //not found
        setChatBoxes([...chatBoxes, { label: activeKey, children: chat, key: activeKey }])
      } else {
        let newChatBoxes = chatBoxes;
        newChatBoxes[index].children = chat;
        setChatBoxes(newChatBoxes)
      }
    }
    setMsgSent(true);
  }, [messages]);

  const renderChat = (chat) => {
    return (
      <>
        {chat.length === 0 ? (
          <p style={{ color: '#ccc' }}> No messages... </p>
        ) :
          (
            chat.map(({ sender, body }, i) => (
              <Message isMe={sender === me} message={body} key={i} />
            ))
          )
        }
        <FootRef ref={msgFooter} />
        {/* error */}
      </>
    );
  };

  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend +
        "'s chat box has already opened.");
    }
    startChat({
      variables: {
        name1: me,
        name2: friend
      }
    });
    // console.log("create")
    return friend;
  };
  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex
      (({ key }) => key === activeKey);
    const newChatBoxes = chatBoxes
      .filter(({ key }) =>
        key !== targetKey);
    setChatBoxes(newChatBoxes);
    return (
      activeKey ?
        activeKey === targetKey ?
          index === 0 ?
            '' : chatBoxes[index - 1].key
          : activeKey
        : '');
  };
  return (
    <>
      <Title name={me} />
      <ChatBoxesWrapper
        type="editable-card"
        onChange={(key) => {
          setActiveKey(key);
          setFriend(key);
          startChat({
            variables: {
              name1: me,
              name2: key
            }
          });
        }}
        activeKey={activeKey}
        onEdit={(targetKey, action) => {
          if (action === 'add') setModalOpen(true);
          else if (action === 'remove') {
            setActiveKey(removeChatBox(targetKey, activeKey));
            setFriend(removeChatBox(targetKey, activeKey));
          }
        }}
        items={chatBoxes}
      >
      </ChatBoxesWrapper>
      <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          setActiveKey(createChatBox(name));
          setFriend(createChatBox(name));
          startChat({
            variables: {
              name1: me,
              name2: name
            }
          });
          setModalOpen(false);
        }}
        onCancel={() => { setModalOpen(false); }}
      />
      <Input.Search
        value={body}
        onChange={(e) => { setBody(e.target.value) }}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !me) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return;
          }
          sendMessage({
            variables: {
              name: me,
              to: activeKey,
              body: msg
            }
          });
          setBody('');
          setMsgSent(true);
        }}
      ></Input.Search>
    </>
  );
}
export default ChatRoom;