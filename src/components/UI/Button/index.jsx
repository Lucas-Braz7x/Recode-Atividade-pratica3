import React from 'react';
import styles from './styles.module.css';

/*eslint-disable */
export const Button = (props) => {
  return <button className={styles.button}>{props.children}</button>
}
