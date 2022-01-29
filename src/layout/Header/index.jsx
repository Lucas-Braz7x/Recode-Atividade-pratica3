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
          <li><Link to='/destino'>Destino</Link></li>
          <li><Link to='/destino'>Promoções</Link></li>
          <li><Link to='/destino'>Contatos</Link></li>
          <li><Link to='/destino'>Cart</Link></li>
          <li><Link to='/destino'>Usuario</Link></li>
        </ul>
      </nav>
    </header>
  )
}
