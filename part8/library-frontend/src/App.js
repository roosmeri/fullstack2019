
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const [favoriteGenre,setFavoriteGenre] = useState('')

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage}></Notify>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(!token) ?
          <button onClick={() => setPage('login')}>login</button>
          : 
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={() => {
              logout()
              setPage('authors')
            }
            }>logout</button>
          </div>
        }

      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
        favoriteGenre={favoriteGenre}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={setErrorMessage}
        setPage={setPage}
        setFavoriteGenre={setFavoriteGenre}
      />

    </div>
  )
}

export default App