const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)


var token = null
var testUserId = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

beforeAll(async () => {
  await User.deleteMany({})
  const testUser = await new User({
    username: 'Admin',
    passwordHash: await bcrypt.hash('salainen', 10)
  }).save()

  await api.post('/api/login')
    .send({ username: 'Admin', password: 'salainen' })

  token = jwt.sign(
    { username: 'Admin', id: testUser.id },
    process.env.SECRET,
    { expiresIn: 60*60 }
  )
  testUserId = testUser.id
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
      user:testUserId,
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
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
      user:testUserId,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      user:testUserId,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(nBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})
describe('deletion of a blog works', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const newBlog = {
      title: 'Nakki3',
      author: 'Mie',
      url: '1238998123',
      user: testUserId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    return token
  })
  test('blog without token is not added', async () => {
    const newBlog = {
      title: 'aba',
      author: 'aaa',
      likes: 1,
      user: testUserId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'aa')
      .send(newBlog).expect(401)
  })
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )
    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
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