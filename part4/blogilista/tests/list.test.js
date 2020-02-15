const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const listWithManyBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa712145',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa712457788',
      title: 'Go To Statement Considered Harmful2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 14,
      __v: 0
    }
  ]

  test('when list has many blogs the sum is correct', () => {
    const result = listHelper.totalLikes(listWithManyBlog)
    expect(result).toBe(25)
  })
})

describe(('favourite blog'), () => {

  const listWithManyBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa712145',
      title: 'Go To Statement Considered Harmful3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa712457788',
      title: 'Go To Statement Considered Harmful2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 14,
      __v: 0
    }
  ]

  test('when list has many blogs the favourite is correct', () => {
    const result = listHelper.favouriteBlog(listWithManyBlog)
    expect(result).toEqual(listWithManyBlog[2])
  })
})

describe(('most blogs'), () => {

  const listWithManyBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa712145',
      title: 'Go To Statement Considered Harmful3',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa712457788',
      title: 'Go To Statement Considered Harmful2',
      author: 'Edward',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 14,
      __v: 0
    },
    {
      _id: 'wqr52346457w1231',
      title: 'Important addition',
      author: 'Alexander',
      url: '',
      likes: 10,
      __v: 0
    },
    {
      _id: 'wqr52346457w1231124235',
      title: 'Important as well',
      author: 'Alexander',
      url: '',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has many blogs the most blogs is correct', () => {
    const result = listHelper.mostBlogs(listWithManyBlog)
    expect(result.author).toBe('Alexander')
    expect(result.blogs).toBe(2)
  })
})

describe(('most likes'), () => {

  const listWithManyBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa712145',
      title: 'Go To Statement Considered Harmful3',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa712457788',
      title: 'Go To Statement Considered Harmful2',
      author: 'Edward',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 14,
      __v: 0
    },
    {
      _id: 'wqr52346457w1231',
      title: 'Important addition',
      author: 'Alexander',
      url: '',
      likes: 10,
      __v: 0
    },
    {
      _id: 'wqr52346457w1231124235',
      title: 'Important as well',
      author: 'Alexander',
      url: '',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has many blogs the most likes is correct', () => {
    const result = listHelper.mostLikes(listWithManyBlog)
    expect(result.author).toBe('Alexander')
    expect(result.likes).toBe(15)
  })
})