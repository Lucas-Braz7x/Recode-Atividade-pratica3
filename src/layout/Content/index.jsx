import React from 'react';

import styles from './styles.module.css';

import * as P from 'prop-types';


export const Content = props => <main className={styles.main}>{props.children}</main>

Content.propTypes = {
  children: P.element.isRequired
}
