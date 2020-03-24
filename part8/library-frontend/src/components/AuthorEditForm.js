import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
      bookCount
      id
    }
  }
`
const AuthorEditForm = ({ authors }) => {
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState('')

  const [changeBirthYear] = useMutation(EDIT_BIRTHYEAR)

  const submit = async (event) => {
    event.preventDefault()
    const b = parseInt(born)

    changeBirthYear({ variables: { name: selected, setBornTo: b } })

    setSelected('')
    setBorn('')
  }

  const handleChange = (event) => {
    event.preventDefault()
    
    setSelected(event.target.value)
  }

  return (
    <div>
      <h2>change year of birth</h2>
        <form onSubmit={submit}>
          <div>name
            <select value={selected} onChange={handleChange}>
              {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>
          </div>
          <div>
            born <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update</button>
        </form>
      </div>
      )
    }
    
export default AuthorEditForm