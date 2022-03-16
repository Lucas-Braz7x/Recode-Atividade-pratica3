import React, { useEffect, useState } from 'react';
import { useJwt } from "react-jwt";
import './styles.scss';

import imgBannerAdventure from '../../assets/adventure.svg';

import { Search, Add } from '@mui/icons-material';
import { getData } from '../../utils';
import { NotFoundElement, mostrarMensagem } from '../../components';
import { Card, Modal, FormularioViagem } from '../../components';
import { useNavigate } from 'react-router-dom';

import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';

export const Viagem = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [id, setId] = useState(null);
  const [userEmailToken, setUserEmailToken] = useState(false);
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const history = useNavigate();

  useEffect(() => {
    if (isExpired) {
      history('/login');
      mostrarMensagem("error", "Faça o login novamente", "Usuário deslogado");
    }

    if (decodedToken) {
      setUserEmailToken(decodedToken.email === "admin@gmail.com" ? true : false);
    }
  }, [isExpired, decodedToken])

  useEffect(() => {
    getData('viagem', handleData);
  }, [updateEffect]);

  useEffect(() => {
    handleFilter(data);
  }, [data, updateEffect])

  useEffect(() => {
    //Por num effect
    const filterPosts = inputValue
      ? filterData.filter((viagem) => {
        return viagem.destinoViagem.toLowerCase().includes(inputValue.toLowerCase());
      })
      : data;
    handleFilter(filterPosts);
  }, [inputValue])

  const handleData = prop => setData(() => prop);
  const handleClose = () => {
    setModalOpened(!modalOpened);
    setId(null);
  }
  const handleFilter = async prop => await setFilterData(() => prop);
  const handleUpdate = () => setUpdateEffect(!updateEffect);
  const handleOpenModal = (id) => {
    setModalOpened(true);
    setId(id);
  }

  return (
    <>
      <section className="banner_pesquisa">
        <img src={imgBannerAdventure} alt="Imagem de pesquisa" />
        <div className="pesquisa">
          <input
            onChange={(event) => setInputValue(event.target.value)}
            type="search"
            placeholder="Digite o seu destino" />
          <div>
            <Search />
          </div>
        </div>
      </section>
      {filterData.length === 0 ? <NotFoundElement /> :
        <div className="cardContainer">
          {filterData.map((viagem, indice) => (
            <Card
              key={indice}
              openModal={handleOpenModal}
              handleUpdate={handleUpdate}
              viagem={viagem} />
          ))}
        </div>}


      {userEmailToken && (
        <div className="adicionar">
          <Add
            color='success'
            alt='Adicionar viagem'
            onClick={() => { setModalOpened(true) }}
          />
        </div>
      )}

      <Modal
        open={modalOpened}
        onClose={handleClose}
      >
        {modalOpened && <FormularioViagem
          id={id ? id : undefined}
          onClose={handleClose}
          handleUpdate={handleUpdate} />}
      </Modal>


    </>
  )
}
