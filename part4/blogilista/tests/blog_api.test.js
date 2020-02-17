const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


const initialBlogs = [
    {
        author: 'Alexander',
        title: 'HTML is easy',
        url: 'url1',
        likes: 3
    },
    {
        author: 'Bea Smith',
        title: 'JavaScript is easy',
        url: 'https://url.com',
        likes: 12
    },
    {
        author: 'Ashley',
        title: 'SQL is the easiest',
        url: 'https://urlsuper.com',
        likes: 65
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(3)
})

test('the blog id is correctly named', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)

    expect(response.body[0]['id']).toBeDefined()
})

test('blog can be added', async () => {
    const newBlog = {
        author: 'Bella',
        title: 'AWS Stories',
        url: 'www.stories.com',
        likes: 5
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.content)

    expect(response.body.length).toBe(initialBlogs.length + 1)

})

afterAll(() => {
    mongoose.connection.close()
})