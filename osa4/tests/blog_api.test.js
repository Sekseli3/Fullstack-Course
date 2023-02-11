const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('testing', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
  
    expect(titles).toContain(
      'ELEC is hard'
    )
  })

  test('Returns right id',async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  })



  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'mie',
      url: 'wikipedia',
      likes: 2,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('set null likes to 0',async () => {
    const nBlog = {
      title: 'Saari',
      author:'Kaari',
      url:'Vaari',
    }
    await api
      .post('/api/blogs')
      .send(nBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const likesAdded = blogs[blogs.length-1].likes
    expect(likesAdded).toBe(0)
  })

  test('mandatory title and url',async () => {
    const nBlog = {
      author:'kaari',
      likes:5,
    }
    await api
      .post('/api/blogs')
      .send(nBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})
describe('deletion of a blog works', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.blogsInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.blogsInDb()

    expect(notesAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
    const contents = notesAtEnd.map(r => r.title)

    expect(contents).not.toContain(noteToDelete.title)
  })
})
describe('updating a blog works', () => {
  test('succeeded with statuscode 200',async () => {
    const nBlog = {
      title:'Harry potter in Italy',
      author:'Luna Lovekiva',
      url:'youtube.com/hevosmiestenkilta2',
      likes: 100000,
    }
    const initialBlogs = await helper.blogsInDb()
    const updated = initialBlogs[0]

    await api.put(`/api/blogs/${updated.id}`)
      .send(nBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedAtEnd =blogsAtEnd[0]
    expect(blogsAtEnd).toHaveLength(2)
    expect(updatedAtEnd.url).toContain('youtube.com/hevosmiestenkilta2')
    expect(updatedAtEnd.likes).toBe(100000)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})