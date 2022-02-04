import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import imgBannerAdventure from '../../assets/adventure.svg';

import { Search, Add } from '@mui/icons-material';
import { getData } from '../../utils';
import { NotFoundElement } from '../../components/UI/NotFoundElement';
import { Card, Modal, FormularioViagem } from '../../components';

export const Viagem = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [id, setId] = useState(null);
  useEffect(() => {
    getData('viagem', handleData);
  }, [updateEffect]);

  useEffect(() => {
    handleFilter(data);
    console.log(updateEffect)
  }, [data])

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
      <section className={styles.banner_pesquisa}>
        <img src={imgBannerAdventure} alt="Imagem de pesquisa" />
        <div className={styles.pesquisa}>
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
        <div className={styles.cardContainer}>
          {filterData.map((viagem, indice) => (
            <Card
              key={indice}
              openModal={handleOpenModal}
              handleUpdate={handleUpdate}
              viagem={viagem} />
          ))}
        </div>}

      <div className={styles.adicionar}>
        <Add
          color='success'
          alt='Adicionar viagem'
          onClick={() => { setModalOpened(true) }}
        />
      </div>

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