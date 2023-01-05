import { gql } from "@apollo/client";

export const USER_UPDATED_SUBSCRIPTION = gql`
  subscription user {
    user {
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
`;
