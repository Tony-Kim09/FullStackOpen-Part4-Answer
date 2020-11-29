const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return    blogs.map(blog => blog.likes)
                   .reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let topLikes = 0
    blogs.forEach(blog => {
        if (topLikes < blog.likes){
            topLikes = blog.likes
            console.log(topLikes)
        }
    })
    const topBlogs = blogs.filter(blog => blog.likes >= topLikes)
    return topBlogs
}

const mostBlogs = (blogs) => {
    let authors = new Map()
    let highestBlogCount = 0
    let topAuthor = ''

    blogs.forEach(blog => {
        if (authors.has(blog.author)){
            authors.set(blog.author, authors.get(blog.author) + 1)
        } else {
            authors.set(blog.author, 1)
        }
    })
    const findHighest = (value, key, map) => {
        if (value > highestBlogCount){
            highestBlogCount = value
            topAuthor = key
        }
    }

    authors.forEach(findHighest)

    const topBlogger = {
        author: topAuthor,
        blogs: highestBlogCount
    }

    return topBlogger
}

const mostTotalLikes = (blogs) => {
    let authors = new Map()
    let highestTotalLikes = 0
    let topAuthor = ''

    blogs.forEach(blog => {
        if (authors.has(blog.author)){
            authors.set(blog.author, authors.get(blog.author) + blog.likes)
        } else {
            authors.set(blog.author, blog.likes)
        }
    })
    const findHighest = (value, key, map) => {
        if (value > highestTotalLikes){
            highestTotalLikes = value
            topAuthor = key
        }
    }

    authors.forEach(findHighest)

    const topBlogger = {
        author: topAuthor,
        likes: highestTotalLikes
    }

    return topBlogger
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostTotalLikes,
}