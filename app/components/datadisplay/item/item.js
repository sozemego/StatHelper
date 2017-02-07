/*jshint esversion: 6 */
import React from "react";

//CSS
import styles from "./cell.css";

/**
	Represents an Item in user's data (graphically).
*/
export default class Item extends React.Component {

	constructor(props) {
		super(props);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
	}

	render() {
		const clicked = this.props.isItemSelected(this.props.index);
		let cellClass = styles.cell + " col-md-1 text-center";
		if(clicked === true) {
			cellClass += " " + styles.cell_clicked;
		}

		return(
			<div onMouseDown = {this.onMouseDown} className = {cellClass} onMouseEnter={this.onMouseEnter}>
					{this.props.value} [{this.props.index}]
			</div>
		);
	}

	onMouseDown() {
		this.props.clickCallback(this.props.index);
	}

	onMouseEnter() {
		if(this.props.isMousePressed()) {
			this.onMouseDown();
		}
	}

}
