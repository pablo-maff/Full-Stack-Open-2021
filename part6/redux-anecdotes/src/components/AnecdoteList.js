import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setLikeNotify, unSetNotify } from "../reducers/notificationReducer";

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
  let anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  
  const sortedAnecdotes = [...anecdotes]
  sortedAnecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setLikeNotify(anecdote.content))
    setTimeout(() => {dispatch(unSetNotify())}, 5000)
  }


  return (
    <>
      {sortedAnecdotes.map(anecdote =>
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