import React, { useState, useEffect } from 'react';

function App() {

  // Variáveis
  const [vetor, setVetor] = useState([]);
  const [campo, setCampo] = useState('');

  // Antes de carregar o componente
  useEffect(() => {

    // URL da API
    const url = "https://jsonplaceholder.typicode.com/posts";

    // Realizar a requisição assíncrona
    const requisicao = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setVetor(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    // Chamar o método que faz a requisição
    requisicao();
  }, []);

  // Método para alterar o valor do campo
  const alterarValorCampo = (event) => {
    // Obtêm o termo digitado
    setCampo(event.target.value)
  }

  // Retorno do componente
  return (
    <div>
      <input type='text' placeholder='Filtrar pelo título' name='campo' onChange={alterarValorCampo} />
      
      <hr />

      <table border='1'>
        <tbody>
          {vetor.filter(obj => obj.title.includes(campo)).map(dados=>(
            <tr key={dados.title}>
              <td>{dados.id}</td>
              <td>{dados.title}</td>
              <td>{dados.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
