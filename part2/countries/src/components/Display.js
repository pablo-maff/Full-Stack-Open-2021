import React from 'react'
import Languages from './Languages'

const Display = ({ countries }) =>
  <>
    {countries.map(country =>
    <div key={country.cca3}>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <Languages languages={Object.entries(country.languages)} />
      <img src={country.flags.png} />
    </div>
  )}
  </>

export default Display