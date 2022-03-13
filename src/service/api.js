import axios from 'axios'

export const api = axios.create({
  //baseURL: "https://agencia-spring.herokuapp.com"
  baseURL: "http://localhost:8080/",
  withCredentials: true
});

export const registrarToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("Token resgistrado");
  }
}


export const registrarTokenExistente = () => {
  const token = localStorage.getItem("USUARIO_LOGADO");
  registrarToken(token);
}
