import React from 'react';
import styles from './styles.module.css';

import animationData from '../../assets/animation/travelling-animation.json';

import Lottie from 'lottie-react';

import { Formulario, Informativo, TituloHome } from '../../components';
//import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <main className={styles.container_wrapper}>
      <TituloHome />
      <Lottie
        className={styles.animacao}
        animationData={animationData}
        loop={true}
      />
      <Informativo />
      <Formulario />
    </main>
  )
}
