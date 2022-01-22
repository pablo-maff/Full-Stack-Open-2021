import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const addData = (event) => {
    const personsNames = persons.map(name => name.name.toLowerCase())
    const personsIds = persons.filter(person => person.name === newName)
      .map(id => id.id)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    event.preventDefault()
    personsNames.includes(newName.toLowerCase()) ?
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      && updateData(...personsIds)
      : phonebookService.create(nameObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNewNumber('')
        })
        .then(setSuccessMessage(
          `Added ${newName}`
        ))
          .then(setTimeout(() => {
            setSuccessMessage(null)
          }, 5000
          ))
  }

  const updateData = id => {
    const person = persons.find(p => p.id === id)
    const changedPhone = { ...person, number: newNumber }

    phonebookService
      .update(id, changedPhone)
      .then(returnedPhone => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPhone))
      })
        .then(setSuccessMessage(
          `Updated ${person.name}`
        ))
          .then(setTimeout(() => {
            setSuccessMessage(null)
          }, 5000
          ))
  }

  const deleteData = id => {
    phonebookService.del(id)
      .then(setPersons(persons.filter(
        person => person.id !== id
        )))
  }

  const filteredData = !filter
    ? persons
    : persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  const handleNewName = (event) => setNewName(event.target.value)

  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => setFilter(event.target.value)


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} />
      <Filter newFilter={filter} handleFilter={handleFilter} />
      <PersonForm newName={newName} handleName={handleNewName}
        newNumber={newNumber} handleNumber={handleNewNumber} addData={addData} />
      <Persons numbers={filteredData} request={deleteData} />
    </div>
  )
}

export default App