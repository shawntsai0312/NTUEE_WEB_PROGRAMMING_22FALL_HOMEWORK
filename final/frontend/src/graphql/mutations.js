import { gql } from "@apollo/client";

export const LOG_IN_REQUEST = gql`
    mutation logInRequest($input:LogInInput!){
        logIn(input:$input){
            message
            name
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($input:CreateUserInput!){
        createUser(input:$input)
    }
`
export const CREATE_MERCHANDISE = gql`
    mutation createMerchandise($input:CreateMerchandiseInput!){
        createMerchandise(input:$input){
            name
        }
    }
`
export const CREATE_ITEM = gql`
    mutation createItem($input:CreateItemInput!){
        createItem(input:$input){
            link
            description
        }
    }
`
export const UPDATE_USER_NAME = gql`
    mutation updateUserName($input:UpdateUserNameInput!){
        updateUserName(input:$input){
            id
            name
            email
        }
    }
`

export const UPDATE_MERCHANDISE = gql`
    mutation updateMerchandise($input:UpdateMerchandiseInput!){
        updateMerchandise(input:$input){
            name
        }
    }
`

export const UPDATE_ITEM = gql`
    mutation updateItem($input:UpdateItemInput!){
        updateItem(input:$input){
            id
            link
            description
        }
    }
`

export const UPDATE_FOLLOWING = gql`
    mutation updateFollowing($input:UpdateFollowingInput!){
        updateFollowing(input:$input){
            name
            email
        }
    }
`

export const DELETE_MERCHANDISE = gql`
    mutation deleteMerchandise($input:DeleteMerchandiseInput!){
        deleteMerchandise(input:$input)
    }
`

export const DELETE_ITEM = gql`
    mutation deleteItem($input:DeleteItemInput!){
        deleteItem(input:$input)
    }
`
export const DELETE_FOLLOWING = gql`
mutation deleteFollowing($input:DeleteFollowingInput!){
    deleteFollowing(input:$input)
}
`