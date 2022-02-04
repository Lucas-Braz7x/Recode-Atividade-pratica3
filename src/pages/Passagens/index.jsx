import { ShoppingCart } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { NotFoundElement } from '../../components';
import { getData } from '../../utils';
import styles from './styles.module.css';

export const Passagens = () => {
  const [passagens, setPassagens] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [viagens, setViagens] = useState([]);
  const [selectValue, setSelectValue] = useState({});

  useEffect(() => {
    try {
      getData('passagem', handleData);
      getData('viagem', handleTravels);
      getData('usuario', handleUsers);
    } catch (error) {
      console.log(error);
    }

  }, []);

  const handleData = prop => setPassagens(() => prop);
  const handleUsers = prop => setUsuarios(() => prop);
  const handleTravels = prop => setViagens(() => prop);
  const handleSelectValue = async () => {
    const viagem = await document.getElementById('viagem');
    const usuario = await document.getElementById('usuario');

    if (viagem || usuario) {
      await setSelectValue({
        "viagem": viagem.value,
        "usuario": usuario.value
      })

      console.log(selectValue)
      alert("Viagem: " + viagem.value + " Usuario: " + usuario.value)
      viagem.value = '';
      usuario.value = '';
    } else {
      alert("Preencha os campos corretamente...")
    }
  }

  return (
    <div className={styles.passagens}>
      <div className={styles.cadastroPassagens}>
        <select name="usuario" id="usuario" >
          <option defaultValue='' value=''>Usuário</option>
          {usuarios.map((usuario, indice) => (
            <option key={indice} value={usuario.nome}>
              {usuario.nome} - {usuario.email}
            </option>
          ))}
        </select>

        <select name="viagem" id="viagem">
          <option defaultValue='' value=''>Viagem</option>
          {viagens.map((viagem, indice) => (
            <option key={indice} value={viagem.destinoViagem}>
              {viagem.destinoViagem} - R${viagem.preco}
            </option>
          ))}
        </select>

        <div
          className={styles.carrinho}
          onClick={handleSelectValue}
        >
          <ShoppingCart sx={{ color: "#6c63ff" }} />
        </div>
      </div>
      {passagens.length === 0 ? <NotFoundElement /> :

        passagens.map((passagem, indice) => (
          <p key={indice}>{passagem.destinoViagem}</p>
        ))
      }

    </div>
  )
}
