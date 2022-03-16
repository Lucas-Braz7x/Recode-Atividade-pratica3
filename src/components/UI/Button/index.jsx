import React from 'react';
import './styles.scss';
import * as P from 'prop-types';


export const Button = (props) => {
  return <button className="button">{props.children}</button>
}

Button.propTypes = {
  children: P.string.isRequired
}
