const listHelper = require('../utils/list_helpers')

describe('highest amount of blogs', () => {
    const blogTest = [
        {
            title: 'test1',
            author: 'name1',
            url: 'name@test.com',
            likes: 5
        },
        {
            title: 'test2',
            author: 'name1',
            url: 'name@test2.com',
            likes: 3
        },
        {
            title: 'test3',
            author: 'name2',
            url: 'name@test1.com',
            likes: 2
        },
        {
            title: 'test1',
            author: 'name1',
            url: 'name@test.com',
            likes: 5
        },
        {
            title: 'test2',
            author: 'name1',
            url: 'name@test2.com',
            likes: 3
        },
        {
            title: 'test3',
            author: 'name1',
            url: 'name@test1.com',
            likes: 2
        }
    ]
    const testBlog = {
        author: 'name1',
        blogs: 5
    }

    test('Testing highest blogcount of 5', () => {
        const result = listHelper.mostBlogs(blogTest)
        expect(result).toEqual(testBlog)
    })

})

describe('highest total Likes for one author', () => {
    const blogTest = [
        {
            title: 'test1',
            author: 'name1',
            url: 'name@test.com',
            likes: 5
        },
        {
            title: 'test2',
            author: 'name1',
            url: 'name@test2.com',
            likes: 3
        },
        {
            title: 'test3',
            author: 'name2',
            url: 'name@test1.com',
            likes: 2
        },
        {
            title: 'test1',
            author: 'name1',
            url: 'name@test.com',
            likes: 5
        },
        {
            title: 'test2',
            author: 'name1',
            url: 'name@test2.com',
            likes: 3
        },
        {
            title: 'test3',
            author: 'name1',
            url: 'name@test1.com',
            likes: 2
        }
    ]
    const testBlog = {
        author: 'name1',
        likes: 18
    }

    test('Testing highest likes 18', () => {
        const result = listHelper.mostTotalLikes(blogTest)
        expect(result).toEqual(testBlog)
    })

})