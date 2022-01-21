import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])


  const addData = (event) => {
    const personsNames = persons.map(name => name.name.toLowerCase())
    const nameObject = {
      name: newName,
      number: newNumber
    }
    event.preventDefault()
    personsNames.includes(newName.toLowerCase()) ?
      alert(`${newName} is already added to phonebook`)
      : phonebookService.create(nameObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
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

  const deleteData = id => {
    phonebookService.del(id)
      .then(phonebookService.getAll()
        .then(initialPhonebook => {
          setPersons(initialPhonebook.filter(person =>
            person.id !== id))
        }))
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={filter} handleFilter={handleFilter} />
      <PersonForm newName={newName} handleName={handleNewName}
        newNumber={newNumber} handleNumber={handleNewNumber} addData={addData} />
      <Persons numbers={filteredData} request={deleteData} />
    </div>
  )
}

export default App