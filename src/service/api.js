import axios from 'axios'

export const api = axios.create({
  baseURL: "https://spring-recode.herokuapp.com"
})