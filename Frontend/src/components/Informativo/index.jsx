import React from 'react';
import './styles.scss';
import imgData from '../../assets/travel_plans.svg';
import { Link } from 'react-router-dom';
import { Button } from '..';



export const Informativo = () => {
  return (
    <div className="viagens">
      <section className="planejamento">
        <div><img src={imgData} alt="" /></div>
        <div className="cartao_planejamento">
          <h3>Viagens planejadas</h3>
          <h4>Pense</h4>
          <h4>Planeje</h4>
          <h4>Execute</h4>
          <span>Deixe a parte burocrática com a gente
            e tenha foco no seu momento de lazer.
          </span>
          <Link to="/viagem">
            <Button>

              Confira nossas viagens
            </Button></Link>
        </div>
      </section>
    </div>

  )
}
