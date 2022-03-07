import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

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
  let anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
         <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleLike={() => vote(anecdote.id)} />
      )}
    </>
  )
}

export default AnecdoteList