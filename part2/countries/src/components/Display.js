import React from 'react'
import Languages from './Languages'

const Display = ({ countries }) =>
  <>
    {countries.map(country =>
    <div key={country.cca3}>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <Languages languages={Object.entries(country.languages)} />
      <img src={country.flags.png} alt='flag' />
    </div>
  )}
  </>

export default Display