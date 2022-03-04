//Hooks de ciclo de vida e estado
import { useEffect, useState } from 'react';
import './App.css';//importa css
import { api } from './service/api';

//Animação de loading
import { BallTriangle } from 'react-loader-spinner';

//Componente funcional, mais usado que componente de classe
function App() {
  const [data, setData] = useState([]);//Estado que carrega os dados a API
  const [idAtual, setIdAtual] = useState('');//Estado que seta o id
  const [valorInput, setValorInput] = useState('');//Estado que pega o valor do input

  //Estado que pega o valor do input que atualiza
  const [valorInputAtualizar, setValorInputAtualizar] = useState({ id: 0, dado: '' });

  //Estado que atualiza o conteúdo que é exibido em tela
  const [atualizar, setAtualizar] = useState(false);

  //Estado que exibe a animação de loading
  const [loader, setLoader] = useState(false);

  //Ciclo de vida, quando montar ele busca os dados
  //Entre [] são as variáveis que atualizam esse ciclo
  //Neste caso quando atualizar mudar, ele busca o conteúdo de novo
  useEffect(() => {
    pegarDados()
  }, [atualizar])

  //Função que pega os dados da api
  const pegarDados = () => {
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
  }

  return (
    <div className="App">
      {loader && <BallTriangle
        color="#00BFFF"
        height={80}
        width={80}
        ariaLabel='loading'
      />}
      {!loader &&
        <>
          <div className='inputText'>
            <input onChange={(e) => setValorInput(e.target.value)} type="text" />
            <button
              disabled={valorInput !== '' ? false : true}
              onClick={() => enviarDados(valorInput)}>Enviar</button>
          </div>

          <div className='inputText'>
            <input
              id="atualizar"
              minLength={2}
              required
              onChange={(e) => setValorInputAtualizar({ id: parseInt(idAtual), dado: e.target.value })}
              type="text" />
            <button
              disabled={idAtual !== '' ? false : true}
              onClick={() => atualizarNome(valorInputAtualizar)}>Atualizar</button>
          </div>

          {data.map(pessoa => (
            <div
              key={pessoa.id}
              className='pessoa'
            >
              <h2
                onClick={e => onclick(e)}
                id={`${pessoa.id}`}
              >{pessoa.nome}</h2>
              <span onClick={() => deleteData(pessoa.id)}>Excluir</span>
            </div>
          ))}
        </>}
    </div >
  );
}

export default App;
