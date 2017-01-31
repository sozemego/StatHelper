import React from "react";

import styles from "./infobar.css";

export default class Infobar extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const message = this.props.message;

		if(!message || message === null) {
			return null;
		}

		return(
			<div className = {styles.infobar}>
					<span className = {styles.infobar_message}>{message}</span>
			</div>
		);

	}

}
