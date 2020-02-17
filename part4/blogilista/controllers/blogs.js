const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      console.log('getting token')
      return authorization.substring(7)
    }
    return null
  }

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
            .populate('user', { username: 1, name: 1, id: 1 })
        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const body = request.body

        const newBlog = await new Blog({
            author: body.author,
            title: body.title,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
        const savedBlog = await newBlog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())

    } catch (exception) {
        next(exception)
    }
}
)

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const token = getTokenFrom(request)

        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)
        if (user._id.toString() === blog.user.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
        } else {
            return response.status(401).json({ error: 'not authorized' })
        }
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
}
)

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        likes: body.likes,
        url: body.url
    }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter