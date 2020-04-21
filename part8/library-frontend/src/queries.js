import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author {name}
      published
      genres
      id
    }
  }
`


export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
      id
    }
  }
`


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`