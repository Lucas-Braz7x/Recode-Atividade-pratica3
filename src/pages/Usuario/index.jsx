import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useJwt } from "react-jwt";
import { Add, ListAlt, Remove, Settings } from '@mui/icons-material';
import { Formulario, mostrarMensagem } from '../../components';
import styles from './styles.module.scss';
import { deleteData, getData } from '../../utils';
import { useNavigate } from 'react-router-dom';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';

export const Usuario = () => {
  const [activeIcon, setActiveIcon] = useState('add');
  const [usuarios, setUsuarios] = useState([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const history = useNavigate();

  useEffect(() => {
    if (isExpired) {
      history('/login');
      mostrarMensagem("error", "Faça o login", "Usuário deslogado");
    }
  }, [isExpired])

  useEffect(() => {
    getData('usuario', setUsuarios);
  }, [activeIcon, updateEffect])



  const usuarioFiltrado = usuarios.filter((usuario) => usuario.id == decodedToken.id)
  const handleActiveIcon = (icon) => setActiveIcon(icon);

  return (
    <div className={styles.container}>
      <div className={styles.icones}>
        <div
          onClick={() => handleActiveIcon('list')}
          className={activeIcon === 'list' ? styles.activeIcon : ''}>
          <ListAlt alt="Listar usuário" />
        </div>
        <div
          onClick={() => handleActiveIcon('setting')}
          className={activeIcon === 'setting' ? styles.activeIcon : ''}>
          <Settings alt="Editar usuário" />
        </div>
        <div
          onClick={() => handleActiveIcon('add')}
          className={activeIcon === 'add' ? styles.activeIcon : ''}>
          <Add alt="Adicionar usuário" />
        </div>
      </div>

      {activeIcon === 'add' && <Formulario />}
      {activeIcon === 'setting' &&
        <Formulario usuario={usuarioFiltrado[0]} id={decodedToken.id} />
      }
      {activeIcon === 'list' &&

        <div className={styles.cardContainer}>

          <div className={styles.cardUsuario}>
            <p >Nome: {usuarioFiltrado[0].nome}</p>
            <p>Email: {usuarioFiltrado[0].email}</p>
            <p>Telefone: *****{usuarioFiltrado[0].telefone.slice(7)}</p>
            <p>CPF: *******{usuarioFiltrado[0].cpf.slice(7)}</p>
            <div
              onClick={() => {
                const response = confirm("Tem certeza que deseja excluir a sua conta?")
                setUpdateEffect(s => !s)
                if (response) {

                  localStorage.removeItem('USUARIO_LOGADO');
                  deleteData('usuario', usuarioFiltrado[0].id);
                  mostrarMensagem("success", "Conta excluída")
                  history('/');
                }
                console.log(response);

              }} className={styles.iconesCard}>
              <Remove />
            </div>
          </div>


        </div>

      }

    </div >


  )
}
