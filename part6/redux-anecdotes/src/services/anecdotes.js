import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async content => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = anecdote => ({
      content: anecdote,
      id: getId(),
      votes: 0
  })

  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

export const vote = async anecdote => {
  const id = anecdote.id
  const changedAnecdote = {
    ...anecdote, votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return response.data
}

//export default { getAll, createNew }