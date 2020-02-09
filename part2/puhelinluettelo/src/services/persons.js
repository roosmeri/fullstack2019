import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getAll = () => {
  const request = axios.get(`${baseUrl}`)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(`${baseUrl}/api/persons`, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
 const request = axios.put(`${baseUrl}/api/persons/${id}`, newObject)
 return request.then(response => response.data)
}

const deletion = (id) => {
  const request = axios.delete(`${baseUrl}/api/persons/${id}`)
  return request.then(response => response.data)
}

export { getAll, create, update, deletion }