import React, { Component } from 'react';

export default class ButtonCustomized extends Component {

	render() {
		const { type, value } = this.props
		return(
			<div className="button">
                <button type={type}>{value}</button>
            </div>
		);
	}
}