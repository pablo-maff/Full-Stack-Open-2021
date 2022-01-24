import React from 'react'

const Filter = ({ newFilter, handleFilter }) =>
  <>
    find countries <input
      value={newFilter}
      onChange={handleFilter}
    />
  </>

export default Filter