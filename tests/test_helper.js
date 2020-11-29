const Blog = require('../models/blog')
const User = require('../models/user')

const testToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndlbmR5IiwiaWQiOiI1ZmJkZGRkMzk0MTU4ODAyMjg2ZjgzNDMiLCJpYXQiOjE2MDYyNzkwNzF9.ixw6EHlJa5Hwj6N_Fm3HFuHC14PQNc4FIysxbJGmZWE'

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'bob',
        url: 'www.bob.bob',
        likes: 100
    },
    {
        title: 'HTML is hard',
        author: 'oub',
        url: 'www.ree.ree',
        likes: 55
    },
    {
        title: 'HTML is ok',
        author: 'peppe',
        url: 'www.pepe.pe',
        likes: 123
    }
]

const initialUsers = [
    {
        blogs: [],
        username: "tony",
        name: "tk",
        passwordHash: "bob"
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ 
        title: "will be removed", 
        author: "lel", 
        url: "no", 
        likes: 1})
    await blog.save()
    await blog.remove()
    
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    nonExistingId,
    blogsInDb,
    usersInDb,
    testToken
}