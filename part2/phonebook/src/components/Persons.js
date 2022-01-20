import React from'react'

const Persons = ({ numbers }) =>
  <>
    <h2>Numbers</h2>
    {numbers.map(person =>
      <p key={person.id}>
        {person.name}: {person.number}
      </p>)}
  </>


export default Persons