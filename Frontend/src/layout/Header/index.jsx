import React, { useState } from 'react';
import { ShoppingCart, Menu, Close, Login } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Cart, Modal, mostrarMensagem } from '../../components';
import './styles.scss';
import { useJwt } from 'react-jwt';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';

export const Header = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  //const [isLogin, setIsLogin] = useState(!isExpired);
  const history = useNavigate();

  const handleClose = () => {
    setModalOpened(!modalOpened);
  }

  const handleLogout = () => {

    if (confirm("Deseja sair?")) {
      mostrarMensagem("error", '', 'Logout efetuado')
      localStorage.removeItem("USUARIO_LOGADO");
      history('/login')
    }
  }

  const handleLogin = () => {
    if (isExpired) {
      mostrarMensagem("warning", '', "Faça login!")
      history('/login')
    } else {
      handleLogout()
    }
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
              <Login onClick={handleLogin} sx={{ color: "#ffffff" }} />
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
