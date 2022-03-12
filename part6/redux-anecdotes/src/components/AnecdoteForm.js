import { connect } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearMessage } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    if (!!props.notification) clearMessage()
    props.setNotification(`You created: ${content}`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
  )
}

const mapStateToProps = state => ({
  notification: state.notification
})

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm