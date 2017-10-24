import React, { Component } from 'react';

export default class ButtonCustomized extend Component {

	render() {
		return(
			<div className="button">
                <button type={this.props.type}>ENVIAR</button>
            </div>
		);
	}
}