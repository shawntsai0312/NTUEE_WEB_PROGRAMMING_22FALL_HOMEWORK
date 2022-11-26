import { Tag } from 'antd'
import styled from 'styled-components';
const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({isMe}) => (isMe ? 'row-reverse' : 'row')};
    margin: 8px 10px;
    & p:first-child {
    margin: 0 5px;
    }
    & p:last-child {
    padding: 2px 5px;
    border-radius: 5px;
    background: #eee;
    color: gray;
    margin: auto 0;
    }
`;
const Message = ({ isMe, message}) => {
    return (
        <StyledMessage isMe={isMe}>
            {message}
        </StyledMessage>
    );
};
export default Message;