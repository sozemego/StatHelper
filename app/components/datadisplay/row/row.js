/*jshint esversion: 6 */
import React from "react";

//COMPONENTS
import Cell from "../cell/cell";

//CSS
import styles from "./row.css";

export default class Row extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const cellValues = this.props.cells;
		const cells = cellValues.map(function(item, index) {
			return(
					<Cell value = {item} key = {index}/>
			);
		});

		return(
			<div className = "row">
				{cells}
			</div>
		);
	}

}
