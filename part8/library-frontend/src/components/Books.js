import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const allBookResult = useQuery(ALL_BOOKS, { pollInterval: 2000})

  const genreBookResult = useQuery(ALL_BOOKS, {
    variables: { genre },
    pollInterval: 2000
  })

  if (genreBookResult.loading || allBookResult.loading ) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const allBooks = allBookResult.data.allBooks
  const books = genreBookResult.data.allBooks

  const genres = new Set()
  allBooks.map(b => b.genres).forEach(list => {
    list.forEach(genre => {
      genres.add(genre)
    })
  })


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
            {books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      <div>
        {Array.from(genres).map(g =>
          <button key={g} onClick={() => setGenre(g)}>{g}</button>)
        }
        <button onClick={() => setGenre('')}>all books</button>
      </div>
    </div>
  )
}

export default Books