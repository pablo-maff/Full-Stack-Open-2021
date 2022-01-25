import Button from './Button'
import Country from './Country'


const Countries = ({ countries, setFilter }) => 
  countries.length > 10 ?
    <p>Too many matches, specify another filter</p>
    :
    countries.length === 1 ? 
    <>
      <Country country={countries} />
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