import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import { Auth } from './Auth';

setTimeout(() => {
  ReactDOM.render(
    //<App />,
    <Auth />,
    document.getElementById('root')
  );
}, 3000);