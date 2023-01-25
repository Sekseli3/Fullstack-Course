import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/all'






const update = (id, newObject) => {
  const request = axios.put(baseUrl+`/`+id, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update,remove }