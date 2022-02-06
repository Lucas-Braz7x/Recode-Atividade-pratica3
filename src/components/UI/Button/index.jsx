import React from 'react';
import styles from './styles.module.css';
import * as P from 'prop-types';


export const Button = (props) => {
  return <button className={styles.button}>{props.children}</button>
}

Button.propTypes = {
  children: P.string.isRequired
}
