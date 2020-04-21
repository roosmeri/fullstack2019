import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  console.log(result.data)
  const books = result.data.allBooks

  const genres = new Set()
  books.map(b => b.genres).forEach(list => {
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
          {genre ?
            books.filter(b => b.genres.includes(genre)).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
            :
            books.map(a =>
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
          <button onClick={() => setGenre(g)}>{g}</button>)
        }
        <button onClick={() => setGenre('')}>all books</button>
      </div>
    </div>
  )
}

export default Books