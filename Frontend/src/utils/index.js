
import { api } from '../service/api';


//Função que pega os dados da api
export const getData = async (rota, setEstado) => {
  await api.get(`/${rota}`)
    .then(response => {
      const data = response.data;
      setEstado(data);
    })
    .catch(err => {
      console.log(err);
      alert('Dados não encontrados');
    })
}

export const deleteData = async (rota, id) => {
  await api.delete(`/${rota}/${id}`);
}


//Função que pega os dados da api
/*const pegarDados = () => {
  api.get("/pessoas")
    .then(response => {
      setData(response.data);
    })
    .catch(err => {
      console.log(err);
      alert('Dados não encontrados');
    })
}

//Função que envia os dados
//async quer dizer assíncrono, logo ele age de forma simultânea com outra atividade
//o Await pede para esperar ele terminar de concluir
const enviarDados = async (dados) => {
  setLoader(true);
  setValorInput('');
  await api.post("/pessoas", {
    "nome": dados
  });
  await setAtualizar(!atualizar)
  setLoader(false)
}

//Atualizo informação
const atualizarNome = async (props) => {
  setLoader(true);
  await api.put(`/pessoas`, {
    "id": props.id,
    "nome": props.dado
  });
  setIdAtual('');
  await setAtualizar(!atualizar);
  setLoader(false);
}

//Pego o id clicado
const onclick = (e) => {
  let inputAtualizar = document.getElementById('atualizar');
  inputAtualizar.value = e.target.textContent;
  setIdAtual(e.target.id);
}

//Deleta ao clicar em excluir
const deleteData = async (id) => {
  setLoader(true);
  await api.delete(`/pessoas/${id}`);
  await setAtualizar(!atualizar)
  setLoader(false)
}*/
