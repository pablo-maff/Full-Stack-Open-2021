import React from 'react'

/*
const App = () => (
  <div>
    <p>Hello world!</p>
  </div>
)

export default App
*/

/*
const App = () => {
  console.log('Hello from component')
  return (
    <div>
      <p>Hello wooorld</p>
    </div>
  )
}

export default App
*/

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}

export default App