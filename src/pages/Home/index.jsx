import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import animationData from '../../assets/animation/travelling-animation.json';

import Lottie from 'lottie-react';
import { BallTriangle } from 'react-loader-spinner';

import { Formulario, Informativo, TituloHome } from '../../components';

export const Home = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1500);
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
          <Formulario id={null} />
        </>
      }
    </>
  )
}
