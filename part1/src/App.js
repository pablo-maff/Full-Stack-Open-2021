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

// STATEFUL COMPONENT
/*
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
  console.log('rendering...', counter)
  return (
    <>
      <div>{counter}</div>
    </>
  )
}
*/

// EVENT HANDLING
/*
// Now the counter will change its value due to user interaction, in this case a click.
const App = () => {
  const [ counter, setCounter ] = useState(0)

// The onClick function can be directly defined on the button, when clicking the component, the app gets re-rendered with the new value.
// A button to reset the counter is added. It will re-render the app with the counter on 0 when clicked.
// DEFINING EVENT HANDLERS WITHIN JSX-TEMPLATES IS NOT A GOOD IDEA. This is just for illustration.
  return (
    <>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(0)}>
        zero
      </button>
    </>
  )
}
*/
// EVENT HANDLERS (THE PROPER WAY)
/*
const App = () => {
  const [ counter, setCounter ] = useState(0)
  
  const increaseByOne = () => setCounter(counter + 1)
  
  const setToZero = () => setCounter(0)
  
// The value of the onClick attribute is a variable containing a reference to a function.
  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}
*/

// PASSING STATE TO CHILD COMPONENTS

// It's recommended to write React components that are small and reusable across the
// application and even across projects. Let's refactor the app so that it's composed
// of three smaller components, one for displaying the counter and two for buttons.

// One best practice in React is to lift the state up (https://reactjs.org/docs/lifting-state-up.html)
// in the component hierarchy. The documentation says:
// "Often, several components need to reflect the same changing data.
// We recommend lifting the state up to their CLOSEST COMMON ANCESTOR"

// To accomplish this, we place the application's state in the App component and pass it down
// to the Display component through props:
/*
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

// Same with the Buttton component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
*/

// REFACTORING THE COMPONENTS

// The Display component only uses the counter field of its props. This means we can simplify
// the component by using DESTRUCTURING (https://fullstackopen.com/en/part1/component_state_event_handlers#destructuring)
// Since this function only contains the return statement, we can define it using the more compact form of arrow functions:
const Display = ({ counter }) => <div>{counter}</div>

// With the Button component we can use destructuring to get only the required fields from props, and also use the more compact form of arrow functions:
const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

// Since now we have an easily reusable Button component, we've also implemented new
// functionality into the app by adding a button that can be used to decrement the counter.

// The name of the prop itslef is not that significant, but the choice wasn't completely random.
// REACT'S OWN OFFICIAL TUTORIAL (https://reactjs.org/tutorial/tutorial.html) SUGGESTS THIS CONVENTION.

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <>
      <Display counter={counter}/>
      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />           
    </>
  )
}


/* WRAPPING UP

CHANGES IN STATE CAUSE RERENDERING

When the application starts, the code in App is executed. This code uses a useState (https://reactjs.org/docs/hooks-reference.html#usestate) hook to create the application state,
setting an initial value of the variable counter. This component contains the Display component - which displays the counter's value, 0 - and three Button components.
The buttons all have event handlers, which are used to change the state of the counter.

When one of the buttons is clicked, the event handler is executed. The event handler changes the state of the App component with the setCounter function.
CALLING A FUNCTION WHICH CHANGES THE STATE CAUSES THE COMPONENT TO RERENDER.

So, if a user clicks the plus button, the button's event handler changes the value of counter to 1, and the App component is rerendered.
This causes its subcomponents Display and Button to also be re-rendered. Display receives the new value of the counter, 1, as props.
The Button components receive event handlers which can be used to change the state of the counter.
*/

export default App