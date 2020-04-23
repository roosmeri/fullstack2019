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

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published 
    author {
      name
    }
    genres
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`
