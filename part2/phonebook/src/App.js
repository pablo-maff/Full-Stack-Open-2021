import React, { useState } from 'react'


const Persons = ({ people }) => <>
  {people.map(name =>
    <div key={name.name}>
      {name.name} {name.number}
    </div>
  )}
</>

const Display = ({ data }) => <>
  <Persons people={data} />
</>


const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-123456'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const personsNames = persons.map(name => name.name)

  const addData = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    personsNames.includes(newName) ?
      alert(`${newName} is already added to phonebook`)
      :
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
  }

  const handleNewName = (event) => setNewName(event.target.value)
  

  const handleNewNumber = (event) => setNewNumber(event.target.value)
  


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addData}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewName}
          /><br />
          number: <input
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display data={persons} />
    </div>
  )
}

export default App