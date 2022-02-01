import React from 'react';
import styles from './styles.module.css';

import animationData from '../../assets/animation/travelling-animation.json';
import Lottie from 'lottie-react';
import imgData from '../../assets/travel_plans.svg';
import { Link } from 'react-router-dom';

export const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <main className={styles.container_wrapper}>
      <h1>Passo&Certo</h1>
      <h2>
        Seja Bem-vindo! Faça das suas viagens
        uma experiência inesquecível
      </h2>

      <Lottie options={defaultOptions} />

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
            <Link to="/promocoes">Confira nossas promoções</Link>
          </div>
        </section>
      </div>

      <div className={styles.form}>Formulário</div>
    </main>
  )
}
