import React from 'react';
import styles from './styles.module.css';
import imgData from '../../assets/travel_plans.svg';
import { Link } from 'react-router-dom';
import { Button } from '..';



export const Informativo = () => {
  return (
    <div className={styles.viagens}>
      <section className={styles.planejamento}>
        <div><img src={imgData} alt="" /></div>
        <div className={styles.cartao_planejamento}>
          <h3>Viagens planejadas</h3>
          <h4>Pense</h4>
          <h4>Planeje</h4>
          <h4>Execute</h4>
          <span>Deixe a parte burocrática com a gente
            e tenha foco no seu momento de lazer.
          </span>
          <Link to="/viagens">
            <Button>

              Confira nossas viagens
            </Button></Link>
        </div>
      </section>
    </div>

  )
}
