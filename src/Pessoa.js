import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomized from './components/InputCustomized';
import ButtonCustomized from './components/ButtonCustomized';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioPessoa extends Component {

	constructor() {
    super();
    this.state = {nome:'', sobrenome:'', participacao:''};
    this.enviaForm = this.enviaForm.bind(this);
	}

	enviaForm(evento) {
    evento.preventDefault();

    $.ajax({
      url: 'http://localhost:3000',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({nome:this.state.nome, sobrenome:this.state.sobrenome, participacao:this.state.participacao}),
      success: function(novaListagem){
      	PubSub.publish('atualiza-lista-pessoas', novaListagem);
      	this.setState({nome:'',email:'',senha:''});
      }.bind(this),
      error: function(resposta){
        if(resposta.status === 400) {
        	new TratadorErros().publicaErros(resposta.responseJSON);
        }
      },
      beforeSend: function() {
      	PubSub.publish("limpa-erros", {});
      }
    });
  }

	saveUpdate(nomeInput, evento) {
		var fieldUpdate = {};

		fieldUpdate[nomeInput] = evento.target.value;

		this.setState(fieldUpdate);
	}

	render() {
		return(
			<div className="header">
        <h1>CADASTRE-SE</h1>
        <p>
          Morbi a metus. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. 
          Nunc tincidunt ante vitae massa.
        </p>
			  <form onSubmit={this.enviaForm} method="post">
	        <InputCustomized id="nome" type="text" name="nome" value={this.state.nome} onChange={this.saveUpdate.bind(this, 'nome')}/>

	        <InputCustomized id="sobrenome" type="text" name="sobrenome" value={this.state.sobrenome} onChange={this.saveUpdate.bind(this, 'sobrenome')}/>

	        <InputCustomized id="participacao" type="text" name="participacao" value={this.state.participacao} onChange={this.saveUpdate.bind(this, 'participacao')}/>

	        <ButtonCustomized type="submit" value="Enviar"/>
	      </form>
	    </div>
		)
	}
}

class TabelaPessoas extends Component {

	render() {
		return(
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
	          this.props.lista.map(function(pessoa){
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
		)
	}
}

export default class PessoaBox extends Component {

	constructor() {
    super();
    this.state = {lista: []};
	}

  componentWillMount() {
    $.ajax({
      url: "http://localhost:3000",
      dataType: 'json',
      success:function(resposta) {
        this.setState({lista:resposta});
      }.bind(this)
    })

    PubSub.subscribe('atualiza-lista-pessoas', function(topico, novaLista){
    	this.setState({lista:novaLista});
    }.bind());
  }

	render() {
		return(
			<div>
				<FormularioPessoa/>
        <TabelaPessoas lista={this.state.lista}/>
      </div>
		);
	}
}