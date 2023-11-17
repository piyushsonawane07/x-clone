import { graphql } from "../../gql"

export const verifyGoogleUserGoogleTokenQuery = graphql(
    `query verifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }`
)