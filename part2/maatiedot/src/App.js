import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>filter shown with<input value={newFilter} onChange={handleFilterChange} /></div>
  )
}

const CountryView = ({ c }) => {
  return (
    <div>
      <h3>{c.name}</h3>
      <h4>languages</h4>
      {c.languages.map(l => <li key={l.name}>{l.name}</li>)}
      <img src={c.flag} alt='failed to fetch' width="200" height="100"></img>
    </div>
  )
}

const CountryList = ({ countries, newCountryName, setNewCountryName }) => {
  const matches = countries.filter(country => country.name.toLowerCase()
    .includes(newCountryName.toLowerCase()))

  if (matches.length === 1) {
    const c = matches[0]
    return <CountryView c={c} />
  }
  if (matches.length <= 10) {
    return matches.map(country => {
      return (
        <Entry key={country.name} country={country} setNewCountryName={setNewCountryName} />
      )
    })
  }
  return <li>Too many matches, specify another filter.</li>
}

const Entry = ({ country, setNewCountryName }) => {
  return (
    <div>
      <li>{country.name}</li><button key={country.id} onClick={() => handleClick(country, setNewCountryName)}>show</button>
    </div>
  )
}
const handleClick = (country, setNewCountryName) => {
  console.log('clicked show')
  setNewCountryName(country.name)
}

function App() {
  const [countries, setCountries] = useState([])
  const [newCountryName, setNewCountryName] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountryNameChange = (event) => {
    setNewCountryName(event.target.value)
  }


  return (
    <div>
      <Filter newFilter={newCountryName} handleFilterChange={handleCountryNameChange} />
      <div id="replacable">
        <CountryList countries={countries} newCountryName={newCountryName} setNewCountryName={setNewCountryName} />
      </div>
    </div>
  );
}

export default App;
