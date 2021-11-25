import { gql } from '@apollo/client'

export const typeDefs = gql`
  type MintUser {
    id: ID
    mintToken: String
    firstName: String
    lastName: String
    email: String
    walletAddress: String
    discordId: String
    country: String
    city: String
    province: String
    postalCode: String
    clothingSize: String
  }

  input UserDataInput {
    mintToken: String
    firstName: String
    lastName: String
    email: String
    walletAddress: String
    discordId: String
    country: String
    city: String
    province: String
    postalCode: String
    clothingSize: String
  }

  type InsertUserDataPayload {
    mintUser: MintUser
  }

  input UserDataGet {
    walletAddress: String
  }

  type GetUserDataPayload {
    mintUsers: [MintUser]
  }

  type Query {
    mintUser(id: ID!): MintUser
    mintUsers: [MintUser]
    viewer: MintUser
  }

  type Mutation {
    insertUserData(input: UserDataInput!): InsertUserDataPayload
    getUserData(input: UserDataGet!): GetUserDataPayload
  }
`
