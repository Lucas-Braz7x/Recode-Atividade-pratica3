import React from 'react';

import './styles.scss';

import * as P from 'prop-types';


export const Content = props => <main className="main">{props.children}</main>

Content.propTypes = {
  children: P.element.isRequired
}
