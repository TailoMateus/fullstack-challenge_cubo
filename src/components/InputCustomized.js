import React, { Component } from 'react';

export default class InputCustomized extend Component {

	render() {
		return(
			<div>
    			<input type={this.props.type} id={this.props.id} value={this.props.value} placeholder="Nome" onChange={this.props.onChange} />
			</div>
		);
	}
}