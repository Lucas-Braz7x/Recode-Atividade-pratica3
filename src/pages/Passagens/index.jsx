import { Remove, ShoppingCart } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NotFoundElement } from '../../components';
import { deleteData, getData } from '../../utils';
import styles from './styles.module.css';

export const Passagens = () => {
  const [passagens, setPassagens] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [viagens, setViagens] = useState([]);
  const [updateEffect, setUpdateEffect] = useState(false);

  useEffect(() => {
    try {
      getData('passagem', handleData);
      getData('viagem', handleTravels);
      getData('usuario', handleUsers);
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {
    try {
      getData('passagem', handleData);
    } catch (error) {
      console.log(error);
    }
  }, [updateEffect]);

  const dispatch = useDispatch();
  const addCart = (usuario, viagem) => {
    dispatch({ type: 'ADD_PASSAGEM', usuario: usuario, viagem: viagem });
  }

  const handleData = prop => setPassagens(() => prop);
  const handleUsers = prop => setUsuarios(() => prop);
  const handleTravels = prop => setViagens(() => prop);

  const handleSelectValue = async () => {

    setUpdateEffect(!updateEffect);

    const viagem = await document.getElementById('viagem');
    const usuario = await document.getElementById('usuario');

    if (viagem.value && usuario.value) {
      const viagemAtual = viagem.value.split('-');
      const filterViagem = viagens.filter((viagem) => {
        return viagem.destinoViagem === viagemAtual[0]
      })

      const usuarioAtual = usuario.value.split('-');
      const filterUsuario = usuarios.filter((usuario) => {
        return usuario.nome === usuarioAtual[0]
      })

      addCart(filterUsuario[0], filterViagem[0]);
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

      <div className={styles.cardContainer}>
        {passagens.length === 0 ? <NotFoundElement /> :


          passagens.map((passagem, indice) => (
            <div className={styles.cardPassagem} key={indice}>
              <p >Viagem: {passagem.viagem.destinoViagem}</p>
              <p>Passageiro: {passagem.usuario.nome}</p>
              <p>Preço: R${passagem.viagem.preco}</p>
              <div onClick={() => {
                deleteData('passagem', passagem.id)
              }} className={styles.icones}>
                <Remove />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
