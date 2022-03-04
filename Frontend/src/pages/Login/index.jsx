import React from 'react';
import { api, registrarToken } from '../../service/api';

import { mostrarMensagem } from '../../components/Toastr';

import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { useNavigate } from 'react-router';

export const Login = () => {
  const history = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    const valorEvento = event.target;
    const msgs = validarFormulario(valorEvento);

    if (msgs && msgs.length > 0) {
      msgs.forEach((mensagem, indice) => {
        mostrarMensagem("warning", mensagem, "Atenção");
      });

      return false;
    }

    api.post("/usuario/autenticar", {
      "email": valorEvento.email.value,
      "senha": valorEvento.senha.value
    })
      .then(response => {
        salvarLocal(response.data);
        mostrarMensagem("success", "Usuário autenticado", "Bem-vindo")
        history('/')
      })
      .catch(e => {
        mostrarMensagem("error", e.response.data, "Falha ao autenticar usuário")
        localStorage.setItem("USUARIO_LOGADO", null);
      });
  }

  const validarFormulario = (evento) => {
    const mensagens = [];

    console.log(evento.email.value)
    if (!evento.email.value) {
      mensagens.push("O campo email é obrigatório");
    } else if (!evento.email.value.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      mensagens.push("Informe um email válido");
    }

    if (!evento.senha.value || !evento.senhaRepetida.value) {
      mensagens.push("Digite a senha 2x");
    } else if (evento.senha.value !== evento.senhaRepetida.value) {
      mensagens.push("As senhas não são iguais");
    }

    return mensagens;
  }

  const salvarLocal = (token) => {
    registrarToken(token);
    localStorage.setItem("USUARIO_LOGADO", token);
    console.log("Usuario logado com sucesso");
  }

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label htmlFor="email">
            <input name='email' id='email' type="email" />
          </label>
        </div>
        <div>
          <label htmlFor="senha">
            <input name='senha' id='senha' type="password" />
          </label>
        </div>
        <div>
          <label htmlFor="senhaRepetida">
            <input name='senhaRepetida' id='senhaRepetida' type="password" />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}