import React, { useState } from 'react';
import styles from './styles.module.css';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button } from '..';
import { api } from '../../service/api';


/*eslint-disable */
export const FormularioViagem = ({ id }) => {
  const [formValue, setFormValue] = useState({});

  const handleSubmit = value => {
    console.log(value);
    setFormValue(value);
    try {
      handleSave(formValue)
    } catch (error) {
      console.log(error);
    }
    alert("Viagem cadastrada");
  }

  const handleSave = async (value) => {
    await api.post("/viagem", {
      "destinoViagem": value.destinoViagem,
      "preco": parseFloat(value.preco),
      "taxas": parseFloat(value.taxas)
    })
  }

  const validations = yup.object().shape({
    destinoViagem: yup.string().min(2).required(),
    preco: yup.number().required(),
    taxas: yup.number().max(100).min(0).required(),
    id: yup.number(),
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
          <Field placeholder="Destino" name="destinoViagem" />
          <ErrorMessage component="span" name='destinoViagem' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field placeholder="Preço" name="preco" />
          <ErrorMessage name='preco' />
        </div>
        <div className={styles.grupo_formulario}>
          <Field placeholder="Taxas" name="taxas" />
          <ErrorMessage name='taxas' />
        </div>
        {id !== null, id !== undefined &&

          <div className={styles.grupo_formulario}>
            <Field placeholder={id} disabled value={id} name="id" />
            <ErrorMessage name='id' />
          </div>
        }
        <Button>Cadastrar</Button>
      </Form>
    </Formik>
  )
}
