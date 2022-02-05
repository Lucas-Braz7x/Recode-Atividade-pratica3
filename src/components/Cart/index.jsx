import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { Remove } from '@mui/icons-material';
import { api } from '../../service/api';

export const Cart = () => {
  const ticketsData = useSelector(state => state.ticketState.data);
  const [tickets, setTicket] = useState(ticketsData);
  const [ticketsLength, setTicketLength] = useState(false);
  console.log(tickets)
  useEffect(() => {
    setTicket(ticketsData)
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
      handleRemove(indice);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.carrinho_Container}>
      {tickets.length === 0 ? <p>Nenhum item no carrinho...</p> :
        tickets.map((ticket, indice) => (
          <div className={styles.carrinho_Content} key={indice}>
            <div>
              <p>Destino: {ticket.viagem.destinoViagem}</p>
              <p>Passageiro: {ticket.usuario.nome}</p>
            </div>
            <span onClick={() => enviarDados(ticket, indice)}>Emitir</span>
            <div onClick={() => handleRemove(indice)} className={styles.icones}>
              <Remove alt="Remover" />
            </div>
          </div>
        ))
      }
    </div>
  )
}

