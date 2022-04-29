import axios from 'axios'
const baseUrl = '/api/blogs/:id/comments'

const getAll = async () => {
  const request = await axios.get(baseUrl)

  return request.response.data
}

const create = async (newCommentObj) => {
  const response = await axios.post(baseUrl, newCommentObj)

  return response.data
}

export default { getAll, create }
