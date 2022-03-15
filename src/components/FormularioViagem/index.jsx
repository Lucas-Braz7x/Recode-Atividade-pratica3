import React from 'react';
import styles from './styles.module.css';
import { Button } from '..';
import { api } from '../../service/api';
import * as P from 'prop-types';

export const FormularioViagem = ({ id, onClose, handleUpdate }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    try {
      console.log(id);

      if (id > 0) {
        handleUpdateViagem("", id)
        console.log('atualiza')
      } else {
        handleSave("value");
        console.log('salva')
      }
      handleUpdate();
      alert("Viagem cadastrada");
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async (value) => {
    await api.post("/viagem", {
      "destinoViagem": value.destinoViagem,
      "preco": parseFloat(value.preco),
      "taxas": parseFloat(value.taxas)
    })
  }

  const handleUpdateViagem = async (value, id) => {
    await api.put("/viagem", {
      "id": id,
      "destinoViagem": value.destinoViagem,
      "preco": parseFloat(value.preco),
      "taxas": parseFloat(value.taxas)
    })
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}
      className={styles.formulario}>
      <span>Cadastre-se e vivencie as melhores experiências</span>
      <div className={styles.grupo_formulario}>
        <input placeholder="Destino" name="destinoViagem" />

      </div>
      <div className={styles.grupo_formulario}>
        <inpu placeholder="Preço" name="preco" />

      </div>
      <div className={styles.grupo_formulario}>
        <input placeholder="Taxas" name="taxas" />

      </div>
      {id !== null, id !== undefined &&

        <div className={styles.grupo_formulario}>
          <input placeholder={id} disabled value={id} name="id" />

        </div>
      }
      <Button>Cadastrar</Button>
    </form>
  )
}

FormularioViagem.propTypes = {
  id: P.number,
  onClose: P.func.isRequired,
  handleUpdate: P.func,
}
