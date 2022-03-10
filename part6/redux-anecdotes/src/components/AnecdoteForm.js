import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNewAnecdoteNotify, unSetNotify } from "../reducers/notificationReducer";
import { createNew } from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNewAnecdoteNotify(content))
    setTimeout(() => {dispatch(unSetNotify(''))}, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
  )
}

export default AnecdoteForm