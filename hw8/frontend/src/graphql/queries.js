import { gql } from '@apollo/client';
export const CHATBOX_QUERY = gql`
    query chatBox($name:String!){
        chatBox(name:$name){
            name
            messages{
                sender
                body
            }
        }
    }
`;