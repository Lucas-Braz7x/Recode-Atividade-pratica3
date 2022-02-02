import axios from 'axios'

export const api = axios.create({
  baseURL: "https://agencia-spring.herokuapp.com"
})
