import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => setFilter(event.target.value)

  const filteredData = !filter
    ? countries
    : countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )


  return (  
    <>
      <h1>Countries</h1>
      <Filter newFilter={filter} handleFilter={handleFilter} />
      <Countries countries={filteredData} setFilter={setFilter} />
    </>
  )
}



export default App