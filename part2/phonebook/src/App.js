import React, { useState } from 'react'

const DisplayPersons = ({ people }) => <>
  {people.map(name =>
    <div key={name.name}>
      {name.name}
    </div>
  )}
</>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const personsNames = persons.map(name => name.name)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    personsNames.includes(newName) ? 
    alert(`${newName} is already added to phonebook`) 
    : 
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPersons people={persons} />
    </div>
  )
}

export default App