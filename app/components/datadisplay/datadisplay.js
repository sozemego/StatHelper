import React from "react";

//COMPONENTS
import Item from "./item/item";
import Separator from "../../components/separator/separator";

//CSS
import styles from "./datadisplay.css";

/**
	Component responsible for displaying user uploaded data.
	The data is displayed in a grid, as a wrapped list of
	column names (which should be item names, like gender or question_1 etc).
	It allows for selecting the items, by either clicking or clicking and dragging.
*/
export default class DataDisplay extends React.Component {

	constructor(props) {
		super(props);
		this.isItemSelected = this.isItemSelected.bind(this);
		this.isMousePressed = this.isMousePressed.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.getItems = this.getItems.bind(this);

		this.state = {
			drag: {
				clicked: false
			}
		};

		/** Since we're not changing the structure of the app dynamically,
			these statements will only be executed once, i.e. those events
			will only be added once
		*/
		document.body.addEventListener("mousedown", this.onClick);
		document.body.addEventListener("mouseup", this.onMouseUp);
	}

	render() {
		const data = this.props.data;
		if(!data) {
			return null;
		}

		const items = this.getItems();

		return(
			<div className = "container">
				<p className = "lead text-center">This grid displays all columns (items) found in your file.</p>
				<p className = "text-center">Select items belonging to your (sub)scales and create them.</p>
				<p className = "text-center">Don&#39;t worry, if you miss one, you will be able to come back and add what you forgot.</p>
				<Separator />
				<div className = "row">
					{items}
				</div>
			</div>
		);
	}

	getItems() {
		const data = this.props.data;
		const itemNames = data[0]; /** first element contains the array of column names*/
		return itemNames.map(function(item, index) {
			return(
				<Item value = {item} key = {index} index = {index} clickCallback = {this.props.clickCallback} isItemSelected = {this.isItemSelected}
				isMousePressed = {this.isMousePressed} />
			);
		}.bind(this));
	}

	/**
		Returns true if the array of selected items contains
		a cell with given index.
	*/
	isItemSelected(index) {
		return this.props.selectedItems.filter(function(i) {
			return i === index;
		}).length > 0;
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
