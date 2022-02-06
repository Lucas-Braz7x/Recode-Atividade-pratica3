import React from 'react';
import styles from './styles.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button } from '..';
import { api } from '../../service/api';
import * as P from 'prop-types';

export const Formulario = ({ id, usuario }) => {
  const handleSubmit = value => {
    const cpf = value.cpf.replace(/[^0-9]/g, '')//Qualquer caractere não numérico
    value.cpf = cpf;

    try {

      if (id > 0) {
        handleUpdateUsuario(value, id)
        console.log('atualiza')
        alert("Usuário Atualizado: " + value.nome);

      } else {
        handleSave(value);
        console.log('salva')
        alert("Usuário cadastrado: " + value.nome);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateUsuario = async (value, id) => {
    await api.put("/usuario", {
      "id": id,
      "nome": value.nome,
      "email": value.email,
      "telefone": value.telefone,
      "cpf": value.cpf
    })
  }


  const handleSave = async (value) => {
    await api.post("/usuario", {
      "nome": value.nome,
      "email": value.email,
      "telefone": value.telefone,
      "cpf": value.cpf
    })
  }


  const validations = yup.object().shape({
    nome: yup.string().min(3).required(),
    email: yup.string().email().required(),
    telefone: yup.string().max(11).min(11).required(),
    cpf: yup.string().min(11).required(),
    id: yup.number()
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
          <Field placeholder={usuario ? usuario.email : "Email"} name="email" />
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
