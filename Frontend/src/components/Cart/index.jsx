import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { Remove } from '@mui/icons-material';
import { api } from '../../service/api';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css'
import { mostrarMensagem } from '../UI/Toastr';

export const Cart = () => {
  const ticketsData = useSelector(state => state.ticketState.data);
  const [tickets, setTicket] = useState(ticketsData);
  const [ticketsLength, setTicketLength] = useState(false);
  //const [counter, setCounter] = useState(0.0);
  useEffect(() => {
    setTicket(ticketsData)
    console.log(ticketsData)
  }, [ticketsLength])

  const handleRemove = (indice) => {
    tickets.splice(indice, 1);
    setTicketLength(e => !e);
  }

  const enviarDados = async (ticket, indice) => {
    try {
      await api.post("/passagem", {
        "viagem": ticket.viagem,
        "usuario": ticket.usuario
      });
      mostrarMensagem("success", ticket.viagem, "Compra efetuada");
      handleRemove(indice);
    } catch (error) {
      mostrarMensagem("error", error, "Falha ao executar compra")
    }
  }

  return (
    <div className="carrinho_Container">
      {tickets.length === 0 ? <p>Nenhum item no carrinho...</p> :
        tickets.map((ticket, indice) => (
          <div className="carrinho_Content" key={indice}>
            <div>
              <p>Destino: {ticket.viagem.destinoViagem}</p>
              <p>Passageiro: {ticket.usuario.nome}</p>
            </div>
            <span onClick={() => enviarDados(ticket, indice)}>Emitir</span>
            <div onClick={() => {
              mostrarMensagem("error", "Não deixe de viajar com a gente", "Cancelamento de passagem")
              handleRemove(indice)
            }} className="icones_cart">
              <Remove alt="Remover" />
            </div>

          </div>
        ))
      }
    </div>
  )
}

