import React, { useEffect, useState } from 'react';
import { ArrowForwardRounded, Refresh, RemoveCircle } from '@mui/icons-material';
import { deleteData } from '../../utils';
import './styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import * as P from 'prop-types';
import { useJwt } from 'react-jwt';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import { mostrarMensagem } from '../UI/Toastr';

export const Card = ({ viagem, handleUpdate, openModal }) => {
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const [email, setEmail] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    if (isExpired) {
      history('/login');
    }

    if (decodedToken) {
      setEmail(decodedToken.email === "admin@gmail.com" ? true : false);
    }

  }, [isExpired, decodedToken])

  const handleDelete = (id) => {
    if (confirm('deseja excluir?')) {
      try {
        deleteData('viagem', id);
        handleUpdate();
        mostrarMensagem("success", "", 'Viagem excluída');
      } catch (error) {
        mostrarMensagem("error", error, "Erro ao deletar viagem");
      }
    }
  }
  return (
    <div className="card">
      <div className="emitir_passagem">
        <Link to="/passagens">
          <ArrowForwardRounded />
        </Link>
      </div>
      <h2>{viagem.destinoViagem}</h2>
      <p>Preço: R$ {viagem.preco}</p>
      <p>Taxas: {viagem.taxas}%</p>
      <div className="icones">
        {email && (
          <>
            <label className="sr_only" htmlFor="atualizar">atualizar</label>
            <Refresh onClick={() => openModal(viagem.id, viagem)}
              id="atualizar" name="atualizar" />
            <label className="sr_only" htmlFor="excluir">excluir</label>
            <RemoveCircle onClick={() => handleDelete(viagem.id)} id="excluir" name="excluir" />
          </>
        )}
      </div>
    </div>
  )
}

Card.propTypes = {
  viagem: P.object.isRequired,
  handleUpdate: P.func.isRequired,
  openModal: P.func.isRequired
}
