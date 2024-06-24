import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Query($first: Int, $after: String, $searchKeyword: String, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
  repositories(first: $first, after: $after, searchKeyword: $searchKeyword, orderDirection: $orderDirection, orderBy: $orderBy) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
    edges {
      node {
        fullName
        language
        description
        ownerAvatarUrl
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
        id
      }
    }
  }
}
`;

export const ME = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews){
      edges {
        node {
          rating
          createdAt
          id
          text
          repositoryId
        }
      }
    }
  }
}
`

export const GET_SINGLE_REPO = gql`
query Query($repositoryId: ID!) {
  repository(id: $repositoryId) {
    fullName
    language
    description
    ownerAvatarUrl
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
}
`

export const GET_REVIEWS = gql`
query Query($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews(first: $first, after: $after) {
      totalCount
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`



/*
export const GET_REVIEWS = gql`
query Query($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`
*/