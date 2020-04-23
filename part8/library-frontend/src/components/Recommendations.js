import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: props.favoriteGenre },
    pollInterval: 2000
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks


  return (
    <div>
      <h2>recommendations</h2>

      <div>books in your favorite genre: <b>{props.favoriteGenre}</b></div>
      <div>
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
      </div>

    </div>
  )
}

export default Recommendations