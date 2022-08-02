const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')

const api = supertest(app)

test('topics are returned as json', async () => {
  await api
    .get('/topic')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four topics', async () => {
  const response = await api.get('/topic')

  expect(response.body).toHaveLength(4)
})

test('the first topic is about HTML', async () => {
  const response = await api.get('/topic')

  expect(response.body[0].title).toBe('HTML')
})

afterAll(() => {
  mongoose.connection.close()
})