import React, { useState } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Cart, Modal } from '../../components';
import styles from './style.module.css';

export const Header = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const handleClose = () => {
    setModalOpened(!modalOpened);
  }
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navegacao}>
          <div className={styles.logo}>
            <Link to='/'>Passo&Certo</Link>
          </div>
          <ul className={styles.menu_opcoes}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/passagens'>Passagens</Link></li>
            <li><Link to='/viagem'>Viagens</Link></li>
            <li><Link to='/usuario'>Usuario</Link></li>
            <li><ShoppingCart
              onClick={() => setModalOpened(true)}
              sx={{ color: "#ffffff" }}
            /></li>
          </ul>
        </nav>
      </header>

      <Modal
        open={modalOpened}
        onClose={handleClose}
      >
        <Cart
          onClose={handleClose}
        />
      </Modal>
    </>
  )
}
