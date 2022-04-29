import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getUser = (userID) => {
  const request = axios.get(`${baseUrl}/${userID}`)

  return request.then((response) => response.data)
}

export default { getAll, getUser }
