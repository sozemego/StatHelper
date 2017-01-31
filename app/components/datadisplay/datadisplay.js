import React from "react";

//COMPONENTS
import Cell from "./cell/cell";
import Separator from "../../components/separator/separator";

//CSS
import styles from "./datadisplay.css";

export default class DataDisplay extends React.Component {

	constructor(props) {
		super(props);
		this.isItemSelected = this.isItemSelected.bind(this);
	}

	render() {
		const data = this.props.data;
		if(!data) {
			return null;
		}

		const itemNames = data[0];
		const cells = itemNames.map(function(item, index) {
			return(
				<Cell value = {item} key = {index} index = {index} clickCallback = {this.props.clickCallback} isItemSelected = {this.isItemSelected}/>
			);
		}.bind(this));

		return(
			<div className = "container">
				<p className = "lead text-center">This grid displays all columns (items) found in your file.</p>
				<p className = "text-center">Select items belonging to your (sub)scales and create them.</p>
				<p className = "text-center">Don&#39;t worry, if you miss one, you will be able to come back and add what you forgot.</p>
				<Separator />
				<div className = "row">
					{cells}
				</div>
			</div>
		);
	}

	isItemSelected(index) {
		let selected = this.props.selectedItems.filter(function(i) {
			return i === index;
		})[0] !== undefined;
		return selected;
	}

}
