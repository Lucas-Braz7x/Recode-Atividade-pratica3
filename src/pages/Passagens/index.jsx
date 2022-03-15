import { Remove, ShoppingCart } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useJwt } from "react-jwt";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotFoundElement } from '../../components';
//import { registrarTokenExistente } from '../../service/api';
import { deleteData, getData } from '../../utils';

import './styles.scss';


export const Passagens = () => {
  const [passagens, setPassagens] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [viagens, setViagens] = useState([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("USUARIO_LOGADO"));
  const history = useNavigate();

  useEffect(() => {
    if (isExpired) {
      history('/login');
    }

    try {
      getData('passagem', handleData);
      getData('viagem', handleTravels);
      getData('usuario', handleUsers);
    } catch (error) {
      console.log(error);
    }

  }, [isExpired]);


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


    if (viagem.value) {
      const viagemAtual = viagem.value.split('-');
      const filterViagem = viagens.filter((viagem) => {
        return viagem.destinoViagem === viagemAtual[0]
      })

      const filterUsuario = usuarios.filter((usuario) => {
        return usuario.id === decodedToken.id;
      })

      addCart(filterUsuario[0], filterViagem[0]);
      alert("Viagem: " + viagem.value + " Usuario: " + filterUsuario[0].nome)
      viagem.value = '';
    } else {
      alert("Preencha os campos corretamente...")
    }
  }

  return (
    <div className="passagens">
      <div className="cadastroPassagens">
        <select name="viagem" id="viagem">
          <option defaultValue='' value=''>Viagem</option>
          {viagens.map((viagem, indice) => (
            <option key={indice} value={viagem.destinoViagem}>
              {viagem.destinoViagem} - R${viagem.preco}
            </option>
          ))}
        </select>

        <div
          className="carrinho"
          onClick={handleSelectValue}
        >
          <ShoppingCart sx={{ color: "#6c63ff" }} />
        </div>
      </div>

      <div className="cardContainer">
        {passagens.length === 0 ? <NotFoundElement /> :


          passagens.map((passagem, indice) => (
            <div className="cardPassagem" key={indice}>
              <p >Viagem: {passagem.viagem.destinoViagem}</p>
              <p>Passageiro: {passagem.usuario.nome}</p>
              <p>Preço: R${passagem.viagem.preco}</p>

              {passagem.usuario.id === decodedToken.id &&
                <div onClick={() => {
                  setUpdateEffect(!updateEffect)
                  deleteData('passagem', passagem.id)
                }} className="icones">
                  <Remove />
                </div>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}
