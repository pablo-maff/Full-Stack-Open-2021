const Filter = ({ newFilter, handleFilter }) =>
  <>
    find countries <input
      value={newFilter}
      onChange={handleFilter}
    />
  </>

export default Filter