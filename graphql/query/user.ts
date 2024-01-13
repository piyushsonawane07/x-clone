import { graphql } from "../../gql"

export const verifyGoogleUserGoogleTokenQuery = graphql(
    `query verifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }`
)

export const getCurrentUserQuery = graphql(`
    query GetCurrentUser {
        getCurrentUser {
            id
            profileImageURL
            lastName
            firstName
            email
            tweets {
                id
                content
                author {
                    id
                    firstName
                    lastName 
                    profileImageURL
                }
            }
        }
    }
`);

export const getUserByIdQuery = graphql(`
    query GetUserById($id: ID!) {
        getUserById(id: $id) {
        id
        firstName
        lastName
        profileImageURL
        tweets {
            content
            id
            author {
                firstName
                lastName
                profileImageURL
            }
        }
        }
    }
`);