// 1.B Imports
//import React from 'react'

// 1.C Imports
import React, { useState } from 'react'

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
/*
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
*/
/*
const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const Footer = () => {
    return (
        <div>
            Greeting app created by <a href="https://github.com/pablo-maff">pablo-maff</a>
        </div>
    )
}
*/
/*
const App = () => {
    const name = 'Peter'
    const age = 10

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
            <Footer />
        </div>
    )
}
*/
// The content of a React component (usually) needs to contain ONE ROOT ELEMENT (i.e. parent <div> tag (NOT a good practice, see below))
/*
const App = () => {  // This will throw an error
    return (
        <h1>Greetings</h1>
        <Hello name='Maya' age={26+10} />
        <Footer />
    )
}
*/
// We could make it work by putting the content inside an array (Bad practice):
/*
const App = () => {  // This works, but not recommended.
    return [
        <h1>Greetings</h1>,
        <Hello name='Maya' age={26+10} />,
        <Footer />
    ]
}
*/
// If we use i.e. a <div> tag as a root element, we will have "extra" div-elements in the DOM-tree.
// This can be avoided by using fragments, like the <React.Fragment> tag. This tag will not add "extra"
// elements to the DOM-tree, and supports the use of keys when needed.
// A new shorter syntax is the use of "empty tags" "<>" and "</>". Is the same than using <React.Fragment> but
// doesn't support the use of of keys or attributes.
/*
const App = () => {     //This works just perfect.
    const name = 'Peter'
    const age = 10

    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26+10} />
            <Hello name={name} age={age} />
            <Footer />
        </>
    )
}
*/

// 1.C:
// Component State & Event Handlers

// Stateful Component

const App = () => {
  // This function call adds state to the component and renders it initialized
  // with the value of zero. Returns an array that contains two items (destructuring)
  // The counter variable is assigned the initial value of state, which is zero
  // setCounter is assigned to a functon that will be used to modify the state.
  const [counter, setCounter] = useState(0)

  // The app calls the setTimeout function and passes it two parameters.
  // A function to increment the counter state and a timeout of one second.
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  // When setCounter is called, React re-renders the component which means that
  // the function body of the component function gets re-executed.
  // Every one second the app will modify its state, and re-render the component 
  // updating the value of counter.
  return (
    <>
      <div>{counter}</div>
    </>
  )
}


// Event Handling


export default App