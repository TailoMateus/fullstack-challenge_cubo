import React, { Component } from 'react';

export default class ButtonCustomized extends Component {

	render() {
		return(
			<div className="button">
                <button type={this.props.type}>{this.props.value}</button>
            </div>
		);
	}
}