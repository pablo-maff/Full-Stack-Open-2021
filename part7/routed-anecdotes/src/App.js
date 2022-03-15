import { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import AnecdoteForm from './Components/AnecdoteForm'
import Footer from './Components/Footer'
import About from './Components/About'
import Anecdote from './Components/Anecdote'
import AnecdoteList from './Components/AnecdoteList'
import Menu from './Components/Menu'
import Notification from './Components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  // REMINDER: If the input of the notification doesn't change, then we can save
  // the value and not cause an unnecessary re-render. In this scenario that's not
  // possible due to the different input we get with every new anecdote.
  const [notification, setNotification] = useState('')

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    notify(`New anecdote: ${anecdote.content} by ${anecdote.author} created`)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <>
      <h1>Software Anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<AnecdoteForm addNew={addNew} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App