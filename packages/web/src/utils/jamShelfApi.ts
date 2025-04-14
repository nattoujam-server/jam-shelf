import axios from 'axios'

const jamShelfApi = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-with': 'XMLHttpRequest',
  },
  responseType: 'json',
})

export default jamShelfApi
