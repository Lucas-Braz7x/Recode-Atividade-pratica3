import React from 'react';
import './styles.scss';
import { Button } from '..';
import { api } from '../../service/api';
import * as P from 'prop-types';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { mostrarMensagem } from '../UI/Toastr';

export const FormularioViagem = ({ id, onClose, handleUpdate }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (id > 0) {
      handleUpdateViagem(event, id)
      handleUpdate();

    } else {
      const messages = handleValidation(event);

      if (messages.length > 0) {
        messages.map((message) => {
          mostrarMensagem("warning", message, "Atenção")
        })
        return;
      }
      handleSave(event);
      handleUpdate();
    }

    onClose();

  }

  const handleSave = async (event) => {
    await api.post("/viagem", {
      "destinoViagem": event.target[0].value,
      "preco": parseFloat(event.target[1].value),
      "taxas": parseFloat(event.target[2].value)
    }).then(() => mostrarMensagem("success", "Viagem para " + event.target[0].value, "Viagem cadastrada"))
      .catch(() => mostrarMensagem("error", "Viagem já cadastrada", "Falha ao cadastrar viagem"));
  }

  const handleUpdateViagem = async (event, id) => {
    if (!event.target[0].value && !event.target[1].value && !event.target[2].value) {
      mostrarMensagem("error", "Preencha ao menos um campo", "Falha ao atualizar viagem")
      return;
    }

    if (event.target[0].value) {
      await api.patch(`/viagem/${id}`, {
        "destinoViagem": event.target[0].value
      }).catch(() => mostrarMensagem("error", "Destino já cadastrado", "Falha ao atualizar viagem"));
    }

    await api.patch(`/viagem/${id}`, {
      "preco": parseFloat(event.target[1].value),
      "taxas": parseFloat(event.target[2].value)
    }).then(() => mostrarMensagem("success", "Viagem para " + event.target[0].value, "Viagem atualizada"))

  }

  const handleValidation = (event) => {
    const msgError = []
    if (!event.target[0].value || event.target[0].value < 3) {
      msgError.push("Preencha o destino corretamente");
    }

    if (!event.target[1].value || event.target[1].value <= 0) {
      msgError.push("Digite um preço válido")
    }

    if (!event.target[2].value || event.target[2].value > 100) {
      msgError.push("Digite uma taxa válida")
    }

    return msgError;
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}
      className="formulario">
      <span>Cadastre as melhores experiências</span>
      <div className="grupo_formulario">
        <input placeholder="Destino" name="destinoViagem" />

      </div>
      <div className="grupo_formulario">
        <input placeholder="Preço" name="preco" />

      </div>
      <div className="grupo_formulario">
        <input max={100} placeholder="Taxas" name="taxas" />

      </div>
      <Button>{id > 0 ? "Atualizar" : "Cadastrar"}</Button>
    </form>
  )
}

FormularioViagem.propTypes = {
  id: P.number,
  onClose: P.func.isRequired,
  handleUpdate: P.func,
}
