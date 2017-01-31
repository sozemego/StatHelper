/*jshint esversion: 6 */
import React from "react";

//CSS
import styles from "./cell.css";

export default class Cell extends React.Component {

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.state = {clicked: false};
	}

	render() {
		const clicked = this.state.clicked;
		let cellClass = styles.cell + " col-md-1 text-center";
		if(clicked === true) {
			cellClass += " " + styles.cell_clicked;
		}

		return(
			<div onClick = {this.onClick} className = {cellClass}>
					{this.props.value}
			</div>
		);
	}

	onClick() {
		let clicked = this.state.clicked;
		clicked = !clicked;
		this.setState({clicked: clicked});
	}

}
