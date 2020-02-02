import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>filter shown with<input value={newFilter} onChange={handleFilterChange} /></div>
  )
}

const CountryList = ({ countries, newCountryName }) => {
  const matches = countries.filter(country => country.name.toLowerCase()
    .startsWith(newCountryName.toLowerCase()))

  if (matches.length === 1) {
    const c = matches[0]
    return (
      <div>
        <h3>{c.name}</h3>
        <h4>languages</h4>
        {c.languages.map(l => <li>{l.name}</li>)}
        <img src={c.flag} alt='failed to fetch' width="200" height="100"></img>
      </div>
    )
  }
  if (matches.length <= 10) {
    return matches.map(country => <Entry key={country.name} country={country} />)
  }
  return <li>Too many matches, specify another filter.</li>
}

const Entry = ({ country }) => {
  return (
    <li>{country.name}</li>
  )
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
      <div>
        <CountryList countries={countries} newCountryName={newCountryName} />
      </div>
    </div>
  );
}

export default App;
