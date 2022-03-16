import React, { useState } from 'react';
import { ShoppingCart, Menu, Close, Login, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Cart, Modal } from '../../components';
import './styles.scss';
import { useJwt } from 'react-jwt';

export const Header = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const [isLogin, setIsLogin] = useState(!isExpired);

  console.log(isLogin)
  const handleClose = () => {
    setModalOpened(!modalOpened);
  }

  const handleLogout = () => {
    localStorage.removeItem("USUARIO_LOGADO");
    setIsLogin(!isLogin);
  }


  return (
    <>
      <header className="header">
        <nav className="navegacao">
          <div className="logo">
            <Link to='/'>Passo&Certo</Link>
          </div>
          <ul className="menu_opcoes">
            <li className={menuOpen ? "menuActive" : "disabled"}>
              <Link to='/'>Home</Link>
            </li>
            <li className={menuOpen ? "menuActive" : "disabled"}>
              <Link to='/passagens'>Passagens</Link>
            </li>
            <li className={menuOpen ? "menuActive" : "disabled"}>
              <Link to='/viagem'>Viagens</Link>
            </li>
            <li className={menuOpen ? "menuActive" : "disabled"}>
              <Link to='/usuario'>Usuario</Link>
            </li>
            <li className={menuOpen ? "menuActive" : "disabled"}>

              <Link to='/login'>
                {
                  isLogin ?
                    <Login sx={{ color: "#ffffff" }} />
                    :
                    <Logout
                      onClick={handleLogout}
                      sx={{ color: "#ffffff" }} />
                }
              </Link>
            </li>
            <li>
              <ShoppingCart
                onClick={() => setModalOpened(true)}
                sx={{ color: "#ffffff" }}
              /></li>
            <li>
              {
                menuOpen ? <Close
                  onClick={() => setMenuOpen(!menuOpen)}
                  sx={{ color: "#ffffff" }}
                /> : <Menu
                  onClick={() => setMenuOpen(!menuOpen)}
                  sx={{ color: "#ffffff" }}
                />
              }

            </li>
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
