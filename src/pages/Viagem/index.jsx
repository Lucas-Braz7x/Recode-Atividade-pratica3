import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import imgBannerAdventure from '../../assets/adventure.svg';

import { Search, Add } from '@mui/icons-material';
import { getData } from '../../utils';
import { NotFoundElement } from '../../components/UI/NotFoundElement';
import { Card } from '../../components';

export const Viagem = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    getData('viagem', handleData);
  }, []);
  useEffect(() => {
    handleFilter(data);
  }, [data])


  const handleData = prop => setData(() => prop);
  const handleFilter = async prop => await setFilterData(() => prop);

  if (inputValue.length > 0 && data.length > 0) {
    const newFilterData = filterData.filter(inputFilter => inputFilter.destinoViagem == inputValue)
    setFilterData(newFilterData);
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
      {data.length === 0 ? <NotFoundElement /> :
        <div className={styles.cardContainer}>
          {filterData.map((viagem, indice) => (
            <Card key={indice} viagem={viagem} />
          ))}
        </div>}

      <div className={styles.adicionar}>
        <Add
          color='success'
          alt='Adicionar viagem'
          onClick={() => alert('Clicado')}
        />
      </div>
    </>
  )
}
