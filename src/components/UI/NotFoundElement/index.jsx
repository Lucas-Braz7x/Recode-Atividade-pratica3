import React from 'react';
import styles from './styles.module.css';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../../assets/animation/not-found.json';

export const NotFoundElement = () => {
  return (
    <div className={styles.notFound}>
      <Lottie
        loop={true}
        animationData={notFoundAnimation}
      />
    </div>
  )
}
