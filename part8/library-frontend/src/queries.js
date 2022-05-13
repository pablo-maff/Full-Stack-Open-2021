import { gql } from '@apollo/client'

// author need to be fixed in the backend
// Add author here when that's done
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      id
      genres
    }
  }
`
// bookCount of authors need to be fixed in the backend
// Add bookCount here when that's done
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
    }
  }
`

// First define params variables and types in the createBook mutation
// Then define the addBook function whith the object that is returning

// author need to be fixed in the backend
// Add author to the query when that's done
export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`

// bookCount of authors need to be fixed in the backend
// Add bookCount here when that's done
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
