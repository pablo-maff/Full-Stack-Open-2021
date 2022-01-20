import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Persons = ({ numbers }) =>
  <>
    <h2>Numbers</h2>
    {numbers.map(person =>
      <p key={person.id}>
        {person.name}: {person.number}
      </p>)}
  </>

const Filter = ({ newFilter, handleFilter }) =>
  <>
    filter shown with <input
      value={newFilter}
      onChange={handleFilter}
    />
  </>

const PersonForm = ({ newName, newNumber, handleName, handleNumber, addData }) => 
<>
  <h2>Add a new person</h2>
  <form onSubmit={addData}>
    <div>
      name: <input
        value={newName}
        onChange={handleName}
      /><br />
      number: <input
        value={newNumber}
        onChange={handleNumber}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
</>


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Get data with Effect Hook
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addData = (event) => {
    const personsNames = persons.map(name => name.name.toLowerCase())
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    event.preventDefault()
    personsNames.includes(newName.toLowerCase()) ?
      alert(`${newName} is already added to phonebook`)
      : axios.post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNewName = (event) => setNewName(event.target.value)

  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => setFilter(event.target.value)

  const filteredData = !filter
    ? persons
    : persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={filter} handleFilter={handleFilter} />
      <PersonForm newName={newName} handleName={handleNewName}
        newNumber={newNumber} handleNumber={handleNewNumber} addData={addData} />
      <Persons numbers={filteredData} />
    </div>
  )
}

export default App