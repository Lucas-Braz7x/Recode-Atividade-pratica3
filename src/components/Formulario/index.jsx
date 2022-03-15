import React, { useState } from 'react';
import './styles.scss';
import { Button } from '..';
import { api } from '../../service/api';
import * as P from 'prop-types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { mostrarMensagem } from '../UI/Toastr';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';

export const Formulario = ({ usuario, id }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [file, setFile] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault()
    const value = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      cpf: document.getElementById('cpf').value,
      senha: document.getElementById('senha').value,
      senhaRepetida: document.getElementById('senhaRepetida').value,
    }
    const cpf = value.cpf.replace(/[^0-9]/g, '')//Qualquer caractere não numérico
    value.cpf = cpf;

    const messages = formValidation(value);

    if (file) {
      handleSaveImage(value);
    }

    try {
      if (id > 0) {
        handleUpdateUsuario(value, id)
      }
      if (id == null) {
        if (messages.length > 0) {
          messages.map(message => mostrarMensagem("warning", message, "Atenção"));
          return;
        }
        handleSave(value);
        console.log('Salva')
      }
    } catch (e) {
      console.log("error de fora")
      console.log(e.ErrorMessage);
    }
  }

  const handleUpdateUsuario = (value, id) => {
    value.nome = value.nome !== '' ? value.nome : usuario.nome;
    value.telefone = value.telefone !== '' ? value.telefone : usuario.telefone;
    value.senha = value.senha !== '' ? value.senha : usuario.senha;
    value.senhaRepetida !== '' ? value.senhaRepetida : usuario.senha;
    //const messages = formValidation(value);

    api.patch(`/usuario/${id}`, {
      "nome": value.nome,
      "telefone": value.telefone,
      "senha": value.senha,
    }).then(() => alert("Usuário atualizado: " + value.nome))
      .catch(error => alert("error", error.response.data, "Falha ao Atualizar"))
  }

  const handleSaveImage = (value) => {
    const formData = new FormData();
    if (file) {
      formData.append("image", file)
      fetch("https://api.imgur.com/3/image/", {
        method: "post",
        headers: {
          Authorization: "Client-ID 99920fc35d49cb3"
        },
        body: formData
      }).then(data => data.json()).then(response => {
        value.imageUrl = response.data.link
      })
      console.log("Salvou imagem")
    }
  }

  const handleSave = (value) => {
    api.post("/usuario", {
      "nome": value.nome,
      "email": value.email,
      "telefone": value.telefone,
      "cpf": value.cpf,
      "senha": value.senha
    }).then(() => mostrarMensagem("success", "Usuário cadastrado: " + value.nome, "Atenção"))
      .catch(error => mostrarMensagem("error", error.response.data.message, "Erro"))
  }

  const formValidation = (value) => {
    const msgError = [];

    if (!value.nome) {
      msgError.push("Preencha o campo nome");
    }

    if (!value.email) {
      msgError.push("O campo email é obrigatório");
    } else if (!value.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      msgError.push("Informe um email válido");
    }

    if (!value.senha || !value.senhaRepetida) {
      msgError.push("Digite a senha 2x");
    } else if (value.senha !== value.senhaRepetida) {
      msgError.push("As senhas não são iguais");
    }

    if (!value.cpf || value.cpf.length < 11) {
      msgError.push("Preencha o campo cpf");
    }
    if (!value.telefone) {
      msgError.push("Preencha o campo telefone corretamente");
    }
    return msgError;
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}
      className='formulario'>
      <span>
        {id ? "Atualizar usuário" :
          "Cadastre-se e vivencie as melhores experiências"
        }</span>
      <div className='grupo_formulario'>
        <input
          id='nome'
          placeholder={usuario ? usuario.nome : "Nome"}
          name="nome" />

      </div>

      <div className='grupo_formulario'>
        {id != null || id != undefined ?
          <input
            disabled
            id='email'
            type="email"
            placeholder={usuario ? usuario.email : "Email"} name="email" />
          :
          <input
            id='email'
            type="email"
            placeholder={usuario ? usuario.email : "Email"} name="email" />
        }

      </div>
      <div className='grupo_formulario'>
        <input
          minLength={11}
          maxLength={11}
          id='cpf'
          placeholder={usuario ? "CPF *******" + usuario.cpf.split(0, 5)[2] : "CPF"}
          name="cpf" />
      </div>

      <div className='grupo_formulario'>
        <input
          minLength={10}
          maxLength={11}
          id='telefone'
          placeholder={usuario ? usuario.telefone : "Telefone"}
          name="telefone" />

      </div>
      <div className='grupo_formulario'>
        <input onChange={(event => setFile(event.target.files[0]))}
          type="file" placeholder={usuario ? usuario.imageUrl : "imageUrl"} name="imageUrl" />

      </div>
      <div className='grupo_formulario'>
        <input
          minLength={8}
          id='senha'
          type={passwordVisible ? "text" : "password"}
          placeholder="Senha ************" name="senha" />


      </div>
      <div className='grupo_formulario'>
        <div onClick={() => setPasswordVisible(s => !s)}>
          {passwordVisible ? <Visibility sx={{ color: "#ffffff" }} /> : <VisibilityOff sx={{ color: "#ffffff" }} />}
        </div>
        <input
          minLength={8}
          id='senhaRepetida'
          type={passwordVisible ? "text" : "password"}
          placeholder={"Digite a senha novamente"} name="senhaRepetida" />

      </div>
      <Button type='submit'>
        {id > 0 ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  )
}

Formulario.propTypes = {
  id: P.number,
  usuario: P.object
}
