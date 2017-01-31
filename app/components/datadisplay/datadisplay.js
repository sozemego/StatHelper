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
				<p className = "lead text-center">This grid displays all columns found in your file.</p>
				<p className = "text-center">Selecting those, you will define scales used in your experiment.</p>
				<p className = "text-center">It is important to properly define your scales, otherwise a wrong statistical test will be used, which is not good for your professor&#39;s blood pressure.</p>
				<p className = "text-center">Remember to define variables like gender or education as scales too, this will allow you to make additional statistical comparisons.</p>
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
