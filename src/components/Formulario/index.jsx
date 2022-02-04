import React from 'react';
import styles from './styles.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button } from '..';
import { api } from '../../service/api';


export const Formulario = () => {
  const handleSubmit = value => {
    console.log(value);
    const cpf = value.cpf.replace(/[^0-9]/g, '')//Qualquer caracter não numérico
    value.cpf = cpf;
    handleSave(value)
    alert(value.cpf);
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
  })

  return (
    <Formik
      initialValues={{}}
      onSubmit={handleSubmit}
      validationSchema={validations}
    >
      <Form className={styles.formulario}>
        <span>Cadastre-se e vivencie as melhores experiências</span>
        <div className={styles.grupo_formulario}>
          <Field placeholder="Nome" name="nome" />

          <ErrorMessage component="span" name='nome' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field placeholder="Email" name="email" />
          <ErrorMessage name='email' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field placeholder="Telefone" name="telefone" />
          <ErrorMessage name='telefone' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field placeholder="CPF" name="cpf" />
          <ErrorMessage name='cpf' />
        </div>
        <Button type='submit'>Cadastrar</Button>
      </Form>
    </Formik>
  )
}
