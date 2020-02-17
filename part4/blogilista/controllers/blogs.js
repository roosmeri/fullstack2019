const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const blog = await new Blog(request.body).save()
        response.status(201).json(blog)
    } catch (exception) {
        next(exception)
    }
}
)

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findByIdAndRemove(request.params.id)
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