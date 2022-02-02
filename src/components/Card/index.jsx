/*eslint-disable */
import React from 'react';
import styles from './styles.module.css';

export const Card = ({ viagem }) => {
  return (
    <div className={styles.card}>
      <h2>Destino: {viagem.destinoViagem}</h2>
      <p>Preço: R$ {viagem.preco}</p>
      <p>Taxas: {viagem.taxas}%</p>

    </div>
  )
}
