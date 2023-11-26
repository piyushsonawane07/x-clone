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
        }
    }
`);