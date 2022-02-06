import React from 'react';
import { useState } from 'react';
import { Add, ListAlt, Remove, Settings, Warning } from '@mui/icons-material';
import { Formulario } from '../../components';
import styles from './styles.module.css';
import { deleteData, getData } from '../../utils';
import { useEffect } from 'react';

export const Usuario = () => {
  const [activeIcon, setActiveIcon] = useState('add');
  const [usuarios, setUsuarios] = useState([]);
  const [passagens, setPassagens] = useState([]);
  const [filterUsuarios, setFilterUsuarios] = useState({});
  const [inputValue, setInputValue] = useState('')
  const [updateEffect, setUpdateEffect] = useState(false);

  useEffect(() => {
    getData('usuario', setUsuarios);
    getData('passagem', setPassagens);
  }, [updateEffect])


  useEffect(() => {
    const usuarioFiltrado = usuarios.filter((usuario) => usuario.nome.toLowerCase().includes(inputValue.toLowerCase()))
    setFilterUsuarios(usuarioFiltrado);
  }, [inputValue])

  const handleActiveIcon = (icon) => setActiveIcon(icon);
  const handleDelete = (usuario) => {
    const teste = passagens.filter((passagem) => passagem.usuario.nome === usuario.nome);
    return teste.length;
  }

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
        <>
          <input type="text" onChange={(event) => setInputValue(event.target.value)} />

          {filterUsuarios.length > 0, inputValue.length > 0 &&
            filterUsuarios.map((usuario, indice) => (
              <Formulario usuario={usuario} key={indice} id={usuario.id} />
            ))}
        </>
      }
      {activeIcon === 'list' &&
        <>
          <div className={styles.cardContainer}>
            {usuarios.map((usuario, indice) => (
              <div className={styles.cardUsuario} key={indice}>
                <p >Nome: {usuario.nome}</p>
                <p>Email: {usuario.email}</p>
                <p>Telefone: {usuario.telefone}</p>
                <p>CPF: {usuario.cpf}</p>
                <div
                  onClick={() => {
                    if (handleDelete(usuario) === 0) {
                      deleteData('usuario', usuario.id),
                        setUpdateEffect(!updateEffect)
                    } else {
                      alert("Há passagens no nome do usuário")
                    }
                  }} className={styles.iconesCard}>
                  <Remove />
                </div>
                {
                  handleDelete(usuario) > 0 && <Warning
                    className={styles.aviso} />
                }
              </div>

            ))}
          </div>
          <p>Obs: {<Warning />} Para excluir este usuário
            excluir as passagens emitidas</p>
        </>
      }

    </div>


  )
}
