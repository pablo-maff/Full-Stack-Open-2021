import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const action = {
    good: {type: 'GOOD'},
    ok: {type: 'OK'},
    bad: {type: 'BAD'},
    zero: {type: 'ZERO'}
  }

  const chooseDispatch = type => {
    store.dispatch(type)
  }

  const good = () => chooseDispatch(action.good)
  
  const ok = () => chooseDispatch(action.ok)

  const bad = () => chooseDispatch(action.bad)

  const zero = () => chooseDispatch(action.zero)

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)