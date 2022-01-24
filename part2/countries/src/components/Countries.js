import React from 'react'
import Button from './Button'
import Display from './Display'
import Weather from './Weather'

const Countries = ({ countries, setFilter, weather, setWeather }) => 
  countries.length > 10 ?
    <p>Too many matches, specify another filter</p>
    :
    countries.length === 1 ? 
    <>
      <Display countries={countries} setWeather={setWeather} />
      <Weather city={countries[0].capital} weather={weather} setWeather={setWeather} />
    </>
      :
      <>
        {countries.map(country =>
          <p key={country.cca3}>
            {country.name.common}
            <Button text='show' onClick={() => setFilter(country.name.common)} />
          </p>)}
      </>

export default Countries