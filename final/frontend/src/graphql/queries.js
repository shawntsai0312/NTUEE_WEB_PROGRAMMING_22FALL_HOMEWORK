import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
    query user($email:String!){
        user(email:$email){
            id
            name
            email
            following{
                email
                name
            }
            merchandise{
                id
                name
                isFavorite
                items{
                    id
                    link
                    description
                }
            }
        }
    }
`

export const GET_USER_SEARCH_QUERY = gql`
    query usersSearch($emailSearchedText:String){
        usersSearch(emailSearchedText:$emailSearchedText){
            id
            name
            email
        }
    }
`