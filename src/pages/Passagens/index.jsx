import { Remove, ShoppingCart } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useJwt } from "react-jwt";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mostrarMensagem, NotFoundElement } from '../../components';
//import { registrarTokenExistente } from '../../service/api';
import { deleteData, getData } from '../../utils';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css'

import './styles.scss';
import Lottie from 'lottie-react';
import animationData from '../../assets/animation/travelling-now.json';


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
      mostrarMensagem("success", "Adicionado ao carrinho de compra", "Finalize a sua compra...")
      viagem.value = '';
    } else {
      mostrarMensagem("error", "Selecione um destino...", "Falha ao adicionar no carrinho de compra")
    }

    setUpdateEffect(!updateEffect);

  }

  const passagensFiltrados = passagens.filter((passagem) => {
    return passagem.usuario.id == decodedToken.id;
  })

  return (
    <div className="passagens">
      <Lottie
        className="animacao"
        animationData={animationData}
        loop={true}
      />
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


          passagensFiltrados.map((passagem, indice) => (
            <div className="cardPassagem" key={indice}>
              <p >Viagem: {passagem.viagem.destinoViagem}</p>
              <p>Passageiro: {passagem.usuario.nome}</p>
              <p>Preço: R${passagem.viagem.preco}</p>

              {passagem.usuario.id === decodedToken.id &&
                <div onClick={() => {
                  deleteData('passagem', passagem.id)
                  mostrarMensagem('error', '', 'Viagem excluída com sucesso')
                  setUpdateEffect(!updateEffect)
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
