import React from "react";

import styles from "./infobar.css";

export default class Infobar extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const errorMessage = this.props.errorMessage;

		if(!errorMessage.message || errorMessage.message === null) {
			return null;
		}

		return(
			<div className = {styles.infobar}>
					<span className = {styles.infobar_message}>{errorMessage.message}</span>
			</div>
		);

	}

}
