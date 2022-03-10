import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNewAnecdoteNotify, unSetNotify } from "../reducers/notificationReducer";


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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