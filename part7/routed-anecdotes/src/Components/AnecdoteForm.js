import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleReset = e => {
    e.preventDefault()
    const values = [content, author, info]
    values.map(value => value.reset())  
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    addNew({
      content: content.inputs.value,
      author: author.inputs.value,
      info: info.inputs.value,
      votes: 0
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputs} />
        </div>
        <div>
          author
          <input {...author.inputs} />
        </div>
        <div>
          url for more info
          <input {...info.inputs} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default AnecdoteForm