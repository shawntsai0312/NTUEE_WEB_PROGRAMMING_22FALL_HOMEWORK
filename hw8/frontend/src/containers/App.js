import { useEffect } from 'react'
import styled from 'styled-components'
import {useChat} from './hooks/useChat'
import SignIn from './SignIn'
import ChatRooom from './ChatRoom'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

function App() {
  const { status, signedIn, displayStatus } = useChat();
  
  useEffect(() => {
    displayStatus(status)}, [status])

  return (
    <Wrapper> {signedIn? <ChatRooom/>: <SignIn/>} </Wrapper>
  )
}

export default App
