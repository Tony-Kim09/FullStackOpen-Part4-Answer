const listHelper = require('../utils/list_helpers')
test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const blogTest = [
        {
            title: 'test1',
            author: 'name1',
            url: 'name@test.com',
            likes: 5
        },
        {
            title: 'test2',
            author: 'name3',
            url: 'name@test2.com',
            likes: 3
        },
        {
            title: 'test3',
            author: 'name2',
            url: 'name@test1.com',
            likes: 2
        }
    ]

    test('testing a list of 3 blogs', () => {
        const result = listHelper.totalLikes(blogTest)
        expect(result).toBe(10)
    })
})

describe('Top Blog', () => {
    const blogTest = [
        {
            title: 'test1',
            author: 'name1',
            url: 'name@test.com',
            likes: 5
        },
        {
            title: 'test2',
            author: 'name3',
            url: 'name@test2.com',
            likes: 3
        },
        {
            title: 'test3',
            author: 'name2',
            url: 'name@test1.com',
            likes: 2
        }
    ]
    const testFavorite = {
        title: 'test1',
        author: 'name1',
        url: 'name@test.com',
        likes: 5
    }

    test('testing to see if it will return top blog', () => {
        const result = listHelper.favoriteBlog(blogTest)
        expect(result[0]).toEqual(testFavorite)
    })
})