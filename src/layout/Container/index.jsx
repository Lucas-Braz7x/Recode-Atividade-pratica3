/* eslint-disable */
import React from 'react';
import P from 'prop-types';
import styles from './style.module.css';

export const Container = (props) => {
  return (<div className={styles.container}>{props.children}</div>
  )
}
