const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

describe('addition of user', () => {

    test('with valid data succeeds', async () => {
        const newUser = {
            name: 'Bella',
            username: 'b3ll4',
            password: 'pass'
        }
        await api.post('/api/users')
            .send(newUser)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')

        expect(response.body.length).toBe(1)

    })

    test('with too short username fails', async () => {
        const newUser = {
            name: 'Bella',
            username: 'b3',
            password: 'pass'
        }
        await api.post('/api/users')
            .send(newUser)
            .expect(400)

    })

    test('with too short password fails', async () => {
        const newUser = {
            name: 'Bella',
            username: 'b3ll444',
            password: 'p'
        }
        await api.post('/api/users')
            .send(newUser)
            .expect(400)

    })
})


afterAll(() => {
    mongoose.connection.close()
})