import React from 'react';
import './styles.scss';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../../assets/animation/not-found.json';

export const NotFoundElement = () => {
  return (
    <div className="notFound">
      <Lottie
        loop={true}
        animationData={notFoundAnimation}
      />
    </div>
  )
}
