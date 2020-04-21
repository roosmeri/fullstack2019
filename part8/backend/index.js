require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
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
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
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
  }


`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args)
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
    findAuthor: (root, args) => Author.findOne({ name: args.name })
  },

  Author: {
    bookCount: (root) => {
      return Book.find({ "author": root.id }).countDocuments()
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      console.log(args)
      let foundAuthor = await Author.findOne({ name: args.author })
      let newAuthor = null
      let book = null
      if (!foundAuthor) {
        newAuthor = new Author({ name: args.author })
        newAuthor.save()
        book = new Book({ ...args, author: newAuthor })
      } else {
        book = new Book({ ...args, author: foundAuthor })
      }
      return book.save()
    },
    addAuthor: (root, args) => {
      const author = new Author({ ...args })
      return author.save()
    },
    editAuthor: async (root, args) => {
      await Author.findOneAndUpdate({ name: args.name }, args)
      return Author.findOne({ name: args.name })
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})