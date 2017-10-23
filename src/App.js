import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    this.state = {lista: [{nome: 'teste', sobrenome: 'testes', participacao: '50'}]};
  }

  componentWillMount() {
    $.ajax({
      url: "http://localhost:3000",
      dataType: 'json',
      success:function(resposta) {
        this.setState({lista:resposta});
      }.bind(this)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>CADASTRE-SE</h1>
          <p>
            Morbi a metus. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. 
            Nunc tincidunt ante vitae massa.
          </p>

          <form action="/pagina-processa-dados-do-form" method="post">
            <div>
                <input type="text" id="nome" placeholder="Nome" />
            </div>

            <div>
                <input type="text" id="sobrenome" placeholder="Sobrenome" />
            </div>

            <div>
                <input type="text" id="participacao" placeholder="Participação" />
            </div>
            <div className="button">
                <button type="submit">ENVIAR</button>
            </div>
          </form>
        </div>

        <div className="dados">
          <h1> DADOS </h1>
          <p>
            Morbi a metus. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. 
            Nunc tincidunt ante vitae massa.
          </p>

          <table>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Participação</th>
            </tr>
            { 
              this.state.lista.map(function(pessoa){
                return (
                  <tr>
                    <td>{ pessoa.nome }</td>
                    <td>{ pessoa.sobrenome }</td>
                    <td>{ pessoa.participacao }</td>
                  </tr>
                )
              }) 
            }
          </table>

          <div className="grafico">

          </div>
        </div>
      </div>
    );
  }
}

export default App;