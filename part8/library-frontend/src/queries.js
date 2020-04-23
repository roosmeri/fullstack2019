import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query ($genre:String) {
    allBooks(genre:$genre) {
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


export const FAVORITE_GENRE = gql`
  query {
    me  {
      favoriteGenre
    }
  }
`

