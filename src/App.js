import React, { useState, useEffect } from 'react';

function App() {

  // Variáveis
  const [vetor, setVetor] = useState([]);
  const [campo, setCampo] = useState('');

  // Antes de carregar o componente
  useEffect(() => {

    // URL da API
    const url = "https://jsonplaceholder.typicode.com/posts";

    // Realizar a requicição assíncrona
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

  // Método para filtrar quando o usuário digita algo no campo de texto
  const filtrar = (event) => {
    // Obtêm o termo digitado
    setCampo(event.target.value)

    // Aqui você faz um fetch para sua API e altera o seu vetor. Irei fazer a alteração de maneira local para exemplificar uma filtragem.
    let vetorTemporario = [];
    
    // Laço de repetição para verificar se possui determinado termo
    for(let i=0; i<vetor.length; i++){
      if(vetor[i].title.indexOf(campo) !== -1){
        vetorTemporario.push(vetor[i])
      }
    }

    // Adiciona no vetor a filtragem realizada
    setVetor([...vetorTemporario]);
  }

  // Retorno do componente
  return (
    <div>
      <input type='text' placeholder='Filtrar pelo título' name='campo' onChange={filtrar} />
      
      <hr />

      <table border='1'>
        <tbody>
          {vetor.map((dados)=>(
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
