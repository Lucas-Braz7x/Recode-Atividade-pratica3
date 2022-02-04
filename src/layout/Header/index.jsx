import { ShoppingCart } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navegacao}>
        <div className={styles.logo}>
          <Link to='/'>Passo&Certo</Link>
        </div>
        <ul className={styles.menu_opcoes}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/destino'>Passagens</Link></li>
          <li><Link to='/viagem'>Viagens</Link></li>
          <li><Link to='/destino'>Contatos</Link></li>
          <li><Link to='/#'>Usuario</Link></li>
          <li><ShoppingCart sx={{ color: "#ffffff" }} /></li>
        </ul>
      </nav>
    </header>
  )
}
