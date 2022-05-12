const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (b) => b.author === args.author && b.genres.includes(args.genre)
        )
      }
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } })
      }
      if (args.author) {
        return books.filter((b) => b.author === args.author)
      }
      return Book.find({})
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    // Ex 8.14 Authors property of books is not working yet, can't fix it now.
    bookCount: (root, args) =>
      books.filter((b) => b.author === root.name).length,
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({
        title: args.title,
        // author: args.author,
        published: args.published,
        genres: args.genres,
      })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const findAuthor = await Author.findOne({ name: args.author })
      if (!findAuthor) {
        const author = new Author({ name: args.author, born: args.born })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author)
        throw new UserInputError('That author does not exist in the App')
      author.born = args.setBornTo

      return author.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
