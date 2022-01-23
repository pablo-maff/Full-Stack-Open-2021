import React from 'react'
import Button from './Button'
import Display from './Display'

const Countries = ({ countries, setFilter }) => 
  countries.length > 10 ?
    <p>Too many matches, specify another filter</p>
    :
    countries.length === 1 ?
      <>
        <Display countries={countries} />
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