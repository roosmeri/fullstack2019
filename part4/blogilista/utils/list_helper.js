const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((a, b) => a + b.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce(function(prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}