import React, { useEffect } from 'react';
import { Rotas } from '../routes';
import { api, registrarToken } from '../service/api';
import { useJwt } from "react-jwt";
/*import { mostrarMensagem } from '../components/Toastr';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';*/

export const Auth = () => {
  const usuarioToken = localStorage.getItem("USUARIO_LOGADO");
  const { decodedToken, isExpired } = useJwt(usuarioToken);
  console.log(decodedToken);
  console.log(isExpired);

  useEffect(() => {
    pegarDados(usuarioToken);
  })


  const pegarDados = (usuarioToken) => {
    if (!usuarioToken) {
      console.log("O Usuário não está logado");
      return;
    }
    registrarToken(usuarioToken);
    api.get('/usuario')
      .then(response => console.log(response))
      .catch(e => console.log("Error", e))
  }

  return (

    <Rotas></Rotas>

  )
}