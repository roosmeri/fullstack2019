require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

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
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    findBook(title: String!): Book
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    me: User
    allUsers: [User!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    addAuthor(
      name: String!
      born: Int
      bookCount: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }


`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args) {
        if (args.author && args.genre) {
          return Book.find({ genres: { "$in": [args.genre] } }).populate('author').find({ 'author.name': args.author })
        }
        else if (args.author) {
          const books = await Book.find({}).populate('author')
          return books.filter(b => b.author.name === args.author)
        }
        else if (args.genre) {
          return Book.find({ genres: { "$in": [args.genre] } }).populate('author')
        }
      }
      return Book.find({}).populate('author')

    },
    findBook: (root, args) =>
      Book.find({ title: args.title }),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allUsers: () => User.find({}),
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: (root) => {
      return Book.find({ "author": root.id }).countDocuments()
    }

  },


  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let foundAuthor = await Author.findOne({ name: args.author })
      let newAuthor = null
      let book = null
      if (!foundAuthor) {
        newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        book = new Book({ ...args, author: newAuthor })
      } else {
        book = new Book({ ...args, author: foundAuthor })
      }
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        await Author.findOneAndUpdate({ name: args.name}, {born: args.setBornTo})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return Author.findOne({ name: args.name })
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})