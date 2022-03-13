import React, { useState } from 'react';
import styles from './styles.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button } from '..';
import { api } from '../../service/api';
import * as P from 'prop-types';

export const Formulario = ({ id, usuario }) => {
  const [file, setFile] = useState();
  console.log(file)

  const handleSubmit = value => {
    const cpf = value.cpf.replace(/[^0-9]/g, '')//Qualquer caractere não numérico
    value.cpf = cpf;

    const messages = formValidation(value);

    if (messages.length > 0) {
      messages.map(message => alert(message));
      return;
    }

    try {
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

      if (id > 0) {
        handleUpdateUsuario(value, id)
        console.log('atualiza')
        alert("Usuário Atualizado: " + value.nome);

      } else {
        handleSave(value);
        console.log('salva')
        alert("Usuário cadastrado: " + value.nome);

      }

    } catch (e) {
      console.log(e.ErrorMessage);
    }
  }

  const handleUpdateUsuario = async (value, id) => {
    await api.put("/usuario", {
      "id": id,
      "nome": value.nome,
      "email": value.email,
      "telefone": value.telefone,
      "cpf": value.cpf,
      "senha": value.senha
    })
  }


  const handleSave = async (value) => {
    await api.post("/usuario", {
      "nome": value.nome,
      "email": value.email,
      "telefone": value.telefone,
      "cpf": value.cpf,
      "senha": value.senha
    }).catch(e => {
      alert(e.response.data);
    })
  }

  const formValidation = (value) => {
    const msgError = [];

    if (value.senha !== value.senhaRepetida) {
      msgError.push("Repita a senha corretamente");
    }
    return msgError;
  }

  const validations = yup.object().shape({
    nome: yup.string().min(3).required(),
    email: yup.string().email().required(),
    telefone: yup.string().max(11).min(11).required(),
    cpf: yup.string().min(11).required(),
    id: yup.number(),
    senha: yup.string().min(8).required(),
    senhaRepetida: yup.string().min(8).required()
  })

  return (
    <Formik
      initialValues={{}}
      onSubmit={handleSubmit}
      validationSchema={validations}
    >
      <Form className={styles.formulario}>
        <span>
          {id ? "Atualizar usuário" :
            "Cadastre-se e vivencie as melhores experiências"
          }</span>
        <div className={styles.grupo_formulario}>
          <Field
            placeholder={usuario ? usuario.nome : "Nome"} name="nome" />
          <ErrorMessage component="span" name='nome' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field type="email" placeholder={usuario ? usuario.email : "Email"} name="email" />
          <ErrorMessage name='email' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field placeholder={usuario ? usuario.telefone : "Telefone"} name="telefone" />
          <ErrorMessage name='telefone' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field placeholder={usuario ? usuario.cpf : "CPF"} name="cpf" />
          <ErrorMessage name='cpf' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field onChange={(event => setFile(event.target.files[0]))}
            type="file" placeholder={usuario ? usuario.imageUrl : "imageUrl"} name="imageUrl" />
          <ErrorMessage name='imageUrl' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field type="password" placeholder={usuario ? usuario.senha : "senha"} name="senha" />
          <ErrorMessage name='senha' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field type="password" placeholder={"Digite a senha novamente"} name="senhaRepetida" />
          <ErrorMessage name='SenhaRepetida' />
        </div>
        {id != null, id != undefined &&
          <div className={styles.grupo_formulario}>
            <Field disabled placeholder={id} value={id} name="id" />
            <ErrorMessage name='id' />
          </div>
        }
        <Button type='submit'>Cadastrar</Button>
      </Form>
    </Formik>
  )
}

Formulario.propTypes = {
  id: P.number,
  usuario: P.object
}
