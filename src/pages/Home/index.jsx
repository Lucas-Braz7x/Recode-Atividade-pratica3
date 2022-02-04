import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import animationData from '../../assets/animation/travelling-animation.json';

import Lottie from 'lottie-react';
import { BallTriangle } from 'react-loader-spinner';

import { Formulario, Informativo, TituloHome } from '../../components';
//import { Link } from 'react-router-dom';

export const Home = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, [])



  return (
    <>
      {loading && <BallTriangle />}
      {!loading &&
        <>
          <TituloHome />
          <Lottie
            className={styles.animacao}
            animationData={animationData}
            loop={true}
          />
          <Informativo />
          <Formulario />
        </>
      }
    </>
  )
}
