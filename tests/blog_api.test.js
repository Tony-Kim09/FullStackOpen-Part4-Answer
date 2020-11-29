const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeAll(async () => {

    const user = {
        username: 'tester1',
        password: 'test'
    }

    const response = await api
                            .post('/api/login')
                            .send(user)
    helper.token = `Bearer ${response.body.token}`
})

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        await api
        .post('/api/blogs')
        .set('Authorization', helper.token)
        .send(blog)
    }
})

test('notes are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are total of 3 notes', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the first blog is about HTTP', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain('HTML is easy')
})

test('a valid blog is added', async () => {
    const newBlog = {
        title: 'adding blog',
        author: 'tk',
        url: 'tk.blog',
        likes: 10
    }

    await api
        .post('/api/blogs')
        .set('Authorization', helper.token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain('adding blog')
})

test('viewing a specific blog', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .set('Authorization', helper.token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
})

test('deleting blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api 
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', helper.token)
        .expect(204)

    const blogAtEnd = await helper.blogsInDb()

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length-1)

    const titles = blogAtEnd.map(r => r.title)
    
    expect(titles).not.toContain(blogToDelete.title)
})

test('test is the unique identifier is id instead of _id', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
})

test('making sure likes has default value of 0', async () => {
    const newBlog = {
        title: 'adding blog',
        author: 'tk',
        url: 'tk.blog'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', helper.token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
})

test('return status 400 for bad request if title', async () => {
    const newBlog = {
        author: 'tk',
        url: 'tk.blog'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', helper.token)
        .send(newBlog)
        .expect(400)
})

test('return status 400 for null URL', async () => {
    const newBlog = {
        author: 'tk',
        title: 'tk.blog'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', helper.token)
        .send(newBlog)
        .expect(400)
})

test('updating blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = Blog({
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: 999999
    })

    await api 
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog.toJSON())
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updatedBlog.likes).toBe(newBlog.likes)
})
    
afterAll(() => {
    mongoose.connection.close()
})