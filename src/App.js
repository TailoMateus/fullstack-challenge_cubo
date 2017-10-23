import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    this.state = {lista: [], nome:'', sobrenome:'', participacao:''};
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setSobrenome = this.setSobrenome.bind(this);
    this.setParticipacao = this.setParticipacao.bind(this);
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

  enviaForm(evento) {
    evento.preventDefault();

    $.ajax({
      url: 'http://localhost:3000',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({nome:this.state.nome, sobrenome:this.state.sobrenome, participacao:this.state.participacao}),
      success: function(resposta){
        this.setState({lista: resposta});
      }.bind(this),
      error: function(resposta){
        console.log("erro");
      }
    });
  }

  setNome(evento) {
    this.setState({nome:evento.target.value});
  }

  setSobrenome(evento) {
     this.setState({sobrenome:evento.target.value});
  }

  setParticipacao(evento) {
     this.setState({participacao:evento.target.value});
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

          <form onSubmit={this.enviaForm} method="post">
            <div>
                <input type="text" id="nome" value={this.state.nome} placeholder="Nome" onChange={this.setNome} />
            </div>

            <div>
                <input type="text" id="sobrenome" value={this.state.sobrenome} placeholder="Sobrenome" onChange={this.setSobrenome} />
            </div>

            <div>
                <input type="text" id="participacao" value={this.state.participacao} placeholder="Participação" onChange={this.setParticipacao} />
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
                  <tr key={pessoa.id}>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.sobrenome}</td>
                    <td>{pessoa.participacao}</td>
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