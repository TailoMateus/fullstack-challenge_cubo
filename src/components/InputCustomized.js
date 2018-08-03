import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomized extends Component {
	state = {msgErro:''};

	componentDidMount = () => {
		PubSub.subscribe("erro-validacao", (topico, erro) => {
			
			if(erro.field === this.props.name)
				this.setState({msgErro: erro.defaultMessage})
		})

		PubSub.subscribe("limpa-erros", topico => {
			this.setState({msgErro: ''})
		})
	}

	render() {
		return(
			<div>
    			<input {...this.props} />
				
				<span className="error">{this.state.msgErro}</span>
			</div>
		);
	}
}