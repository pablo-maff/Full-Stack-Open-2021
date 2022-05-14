const { UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
require('dotenv').config()

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // fix the author queries after fixing authors data
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
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    // Ex 8.14 Authors property of books is not working yet, can't fix it now.
    bookCount: (root, args) =>
      books.filter((b) => b.author === root.name).length,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

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

      // send notification to subscribers
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author)
        throw new UserInputError('That author does not exist in the App')

      author.born = args.setBornTo

      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
