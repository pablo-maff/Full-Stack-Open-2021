import React, { useState } from 'react'


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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


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
      : setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
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