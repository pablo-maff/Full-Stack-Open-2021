import React, { useEffect, useState } from 'react'
import Languages from './Languages'
import Weather from './Weather'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const city = country[0].capital
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`

  useEffect(() => {
    axios.get(url).then(response => {
      setWeather(response.data)
    })
  }, [url])

  return (
    <>
      {country.map(country =>
      <div key={country.cca3}>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Population:</strong> {country.population}</p>
        <Languages languages={Object.entries(country.languages)} />
        <img src={country.flags.png} alt='flag' />
      </div>
    )}
      <Weather city={country[0].capital} weather={weather} />
    </>
  )
}

export default Country