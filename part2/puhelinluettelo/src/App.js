import React, { useState, useEffect } from 'react'
import Entry from './components/Entry'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { getAll, create, deletion, update } from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getAll().then(data => setPersons(data))
  }, [])


  const doMessaging = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  
  const updatePerson = (idx) => {
    window.confirm(`${newName} is already added to phonebook, replace existing number?`)
    const old = persons[idx]
    update(old.id, { name: old.name, number: newNumber }).then(updated => {
      getAll().then(data => setPersons(data))
      console.log("After update ", persons)
      doMessaging(`Number of ${newName} was updated.`)
      setNewName('')
      setNewNumber('')

    })
  }


  const addPerson = (event) => {
    event.preventDefault()
    const idx = persons.map(person => person.name).indexOf(newName)
    if (idx !== -1) {
      updatePerson(idx)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    create(personObject).then(added => {
      setPersons(persons.concat(added))
      console.log(persons)
      doMessaging(`Added ${newName} succesfully.`)
      setNewName('')
      setNewNumber('')
    })

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (person) => {
    window.confirm(`Delete ${person.name}?`)
    deletion(person.id).then(deleted => {
      setPersons(persons.filter(p => p.id !== person.id))
      console.log(persons)
      doMessaging(`Deleted ${person.name}`)
    })
  }

  const personsToShow = persons.filter(person => person.name.startsWith(newFilter))

  const entryList = personsToShow.map(person => {
    return (
      <Entry key={person.name} person={person} deletePerson={deletePerson} />
    )
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new number</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {entryList}
      </div>
    </div>
  )

}

export default App