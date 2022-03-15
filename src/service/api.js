import axios from 'axios';
//import { useJwt } from "react-jwt";



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


/* export const registrarTokenExistente = () => {
  const token = localStorage.getItem("USUARIO_LOGADO");
  useJwt
  registrarToken(token);
}

export const Logar = (token) => {
  api.post("/usuario/login", {
    "email": value.email,
    "senha": value.senha
  })
    .then((response) => {
      salvarLocal(response.data);
    })
} */
