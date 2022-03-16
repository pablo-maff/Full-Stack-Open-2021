const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <>
      {country.map(c => <div key={c.cca3}>
        <h3>{c.name.common}</h3>
        <div>population {c.population}</div> 
        <div>capital {c.capital}</div>
        <img src={c.flags.png} height='100' alt={`flag of ${c.name.common}`}/> 
      </div>)}
    </>
  )  
}

export default Country