import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleLike }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleLike}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const sortAnecdotes = (anecdotes) => {
    const sortedAnecdotes = [...anecdotes]
    sortedAnecdotes.sort((a, b) => b.votes - a.votes)
    return sortedAnecdotes
  }

  let anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) {
      return sortAnecdotes(anecdotes)
    }
    else {
      let filtered = anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))
 
      return sortAnecdotes(filtered)    
    }
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted: ${anecdote.content}`, 2))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleLike={() => vote(anecdote)}
        />
      )}
    </>
  )
}

export default AnecdoteList