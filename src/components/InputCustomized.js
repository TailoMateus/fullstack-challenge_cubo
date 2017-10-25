import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomized extend Component {

	constructor() {
		super();
		this.state = {msgErro:''};
	}

	render() {
		return(
			<div>
    			<input type={this.props.type} id={this.props.id} value={this.props.value} placeholder="Nome" onChange={this.props.onChange} />
				<span className="error">{this.state.msgErro}</span>
			</div>
		);
	}

	componentDidMount() {
		PubSub.subscribe("erro-validacao", function(topico, erro){
			
			if(erro.field === this.props.name)
				this.setState({msgErro: erro.defaultMessage});

		}.bind(this));

		PubSub.subscribe("limpa-erros", function(topico){
			this.setState({msgErro: ''});

		}.bind(this));
	}
}