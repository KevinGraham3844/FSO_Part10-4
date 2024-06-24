import { gql } from '@apollo/client';

export const LOGIN = gql `
mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
        accessToken
    }
}
`

export const SUBMIT_REVIEW = gql`
mutation Mutation($review: CreateReviewInput) {
  createReview(review: $review) {
    createdAt
    id
    rating
    text
    user {
      id
      username
    }
    repositoryId
  }
}
`

export const CREATE_USER = gql`
mutation Mutation($user: CreateUserInput) {
  createUser(user: $user) {
    createdAt
    id
    username
  }
}
`

export const DELETE_REVIEW = gql`
mutation Mutation($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}`