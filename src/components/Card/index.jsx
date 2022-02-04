import React from 'react';
import { ArrowForwardRounded, Refresh, RemoveCircle } from '@mui/icons-material';
import { deleteData } from '../../utils';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

/*eslint-disable */
export const Card = ({ viagem, handleUpdate, openModal }) => {
  const handleDelete = (id) => {
    if (confirm('deseja excluir?')) {
      try {
        deleteData('viagem', id);
        handleUpdate();
        alert('Viagem excluída');
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <div className={styles.card}>
      <div className={styles.emitir_passagem}>
        <Link to="/passagens">
          <ArrowForwardRounded />
        </Link>
      </div>
      <h2>{viagem.destinoViagem}</h2>
      <p>Preço: R$ {viagem.preco}</p>
      <p>Taxas: {viagem.taxas}%</p>
      <div className={styles.icones}>
        <label className={styles.sr_only} htmlFor="atualizar">atualizar</label>
        <Refresh onClick={() => openModal(viagem.id)}
          id="atualizar" name="atualizar" />
        <label className={styles.sr_only} htmlFor="excluir">excluir</label>
        <RemoveCircle onClick={() => handleDelete(viagem.id)} id="excluir" name="excluir" />
      </div>
    </div>
  )
}
