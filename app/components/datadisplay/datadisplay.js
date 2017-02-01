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
		this.isMousePressed = this.isMousePressed.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.state = {
			drag: {
				clicked: false
			}
		};

		/** Since we're not changing the structure of the app dynamically,
		these statements will only be executed once, i.e. this component's
		constructor will only be called once. */
		document.body.addEventListener("mousedown", this.onClick);
		document.body.addEventListener("mouseup", this.onMouseUp);
	}

	render() {
		const data = this.props.data;
		if(!data) {
			return null;
		}

		const itemNames = data[0];
		const cells = itemNames.map(function(item, index) {
			return(
				<Cell value = {item} key = {index} index = {index} clickCallback = {this.props.clickCallback} isItemSelected = {this.isItemSelected}
				isMousePressed = {this.isMousePressed} />
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

	onClick() {
		const updatedDrag = this.state.drag;
		updatedDrag.clicked = true;
		this.setState({drag: updatedDrag});
	}

	onMouseUp() {
		const updatedDrag = this.state.drag;
		updatedDrag.clicked = false;
		this.setState({drag: updatedDrag});
	}

	isMousePressed() {
		return this.state.drag.clicked === true;
	}

}
