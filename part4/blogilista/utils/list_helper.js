const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((a, b) => a + b.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce(function (prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })
}

const mostBlogs = (blogs) => {
    const freqs = {}
    let max = ''
    blogs.forEach(element => {
        name = element.author
        freqs[name] = freqs[name] ? freqs[name] + 1 : 1
        if (!freqs[max] || freqs[max] < freqs[name]) { max = name }
    });
    return {
        'author': max,
        'blogs': freqs[max]
    }
}

const mostLikes = (blogs) => {
    const freqs = {}
    let max = ''
    blogs.forEach(element => {
        name = element.author
        freqs[name] = freqs[name] ? freqs[name] + element.likes : element.likes
        if (!freqs[max] || freqs[max] < freqs[name]) { max = name }
    })
    return {
        'author': max,
        'likes': freqs[max]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}