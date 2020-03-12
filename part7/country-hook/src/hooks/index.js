import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        console.log(response)
        setCountry({ data: { ...response.data[0] }, found: true })

      }).catch(error => {
      setCountry({ data: null, found: false })
    })
  }, [name])

  return country

}
