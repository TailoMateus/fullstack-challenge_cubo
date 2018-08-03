import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomized from './components/InputCustomized';
import ButtonCustomized from './components/ButtonCustomized';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioPessoa extends Component {
	state = {nome:'', sobrenome:'', participacao:''};
    
	enviaForm = evento => {
	    evento.preventDefault();

	    const { nome, sobrenome, participacao } = this.state

	    $.ajax({
	      url: 'http://localhost:8080/index/dados',
	      contentType: 'application/json',
	      dataType: 'json',
	      type: 'post',
	      data: JSON.stringify({nome, sobrenome, participacao}),
	      success: novaListagem => {
	      	PubSub.publish('atualiza-lista-pessoas', novaListagem);
	      	this.setState({nome:'',sobrenome:'',participacao:''});
	      },
	      error: resposta => {
	        if(resposta.status === 400) {
	        	new TratadorErros().publicaErros(resposta.responseJSON);
	        }
	      },
	      beforeSend: () => {
	      	PubSub.publish("limpa-erros", {});
	      }
	    })
	  }

	saveUpdate = (nomeInput, evento) => {
		const fieldUpdate = {};

		fieldUpdate[nomeInput] = evento.target.value;

		this.setState(fieldUpdate);
	}

	render() {
		const { nome, sobrenome, participacao } = this.state
		return(
			<div className="header">
		        <h1>CADASTRE-SE</h1>
		        <p>
		          Morbi a metus. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. 
		          Nunc tincidunt ante vitae massa.
		        </p>
				<form onSubmit={this.enviaForm} method="post">
			        <InputCustomized id="nome" type="text" name="nome" value={nome} onChange={this.saveUpdate(this, 'nome')}/>

			        <InputCustomized id="sobrenome" type="text" name="sobrenome" value={sobrenome} onChange={this.saveUpdate(this, 'sobrenome')}/>

			        <InputCustomized id="participacao" type="text" name="participacao" value={participacao} onChange={this.saveUpdate(this, 'participacao')}/>

			        <ButtonCustomized type="submit" value="Enviar"/>
			    </form>
			</div>
		)
	}
}

class TabelaPessoas extends Component {

	render() {

	    const pessoas = this.props.lista.map(pessoa =>{
	      return(
	          <tr key={pessoa.nome}>
                <td>{pessoa.nome}</td>
                <td>{pessoa.sobrenome}</td>
                <td>{pessoa.participacao}</td>
              </tr>
	        );
	      });


	    return(
	    	<div className="dados">
		        <h1> DADOS </h1>
		        <p>
		          Morbi a metus. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. 
		          Nunc tincidunt ante vitae massa.
		        </p>

		      <table className="pure-table">
		        <thead>
		          <tr>
		            <th>Nome</th>
		            <th>Sobrenome</th>
		            <th>Participacao</th>
		          </tr>
		        </thead>
		        <tbody>
		          {pessoas}
		        </tbody>
		      </table>

		      <div className="grafico">


		        </div>
		    </div>
	    );
	}
}

export default class PessoaBox extends Component {
	state = {lista: []};

  componentDidMount = () => {
    $.ajax({
      url: "http://localhost:8080/index/dados",
      dataType: 'json',
      success: resposta => {
        this.setState({lista:resposta});
      }
    })

    PubSub.subscribe('atualiza-lista-pessoas', (topico,lista) => {
      this.setState({lista:lista});
    })    
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
