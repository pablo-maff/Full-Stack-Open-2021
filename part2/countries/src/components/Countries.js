const Languages = ({ languages }) => 
  <>
    <h3>languages</h3>
    <ul>
      {languages.map((language, i) =>
        <li key={language[0]}>
          {language[1]}</li>
      )}
    </ul>
  </>



const Countries = ({ countries }) => 
  countries.length > 10 ?
    <p>Too many matches, specify another filter</p>
    :
    countries.length === 1 ?
      <>
        {countries.map(country =>
          <>
            {console.log(country.flag)}
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <Languages languages={Object.entries(country.languages)} />
            <img src={country.flags.png} />
          </>
        )}
      </>
      :
      <>
        {countries.map(country =>
          <p key={country.cca3}>
            {country.name.common}
          </p>)}
      </>

export default Countries