import React from "react";

export default class ScaleInfo extends React.Component {

	constructor(props) {
		super(props);
		this.getItems = this.getItems.bind(this);
		this.state = {
			displayedItemsLimit: 40 /** Items displayed before truncation */
		};
	}

	render() {

		const scale = this.props.scale;

		let parent;
		if(scale.parent !== undefined) {
			parent = <div className = "col-md-4 lead">Parent: {this.props.getScale(scale.parent).name}</div>;
		}

		const items = this.getItems();

		return(
			<div className = "row">
				<div className = "col-md-4 lead">Name: {scale.name}</div>
				{parent}
				<div>Items: {items}</div>
			</div>
		);
	}

	getItems() {
		const displayedItemsLimit = this.state.displayedItemsLimit;

		const scale = this.props.scale;
		const items = this.getItemsCopy(displayedItemsLimit).sort(function(a, b) {
			return a - b;
		});

		let itemText = "";

		for(var i = 0; i < items.length; i++) {
			itemText += items[i] + " ";
		}

		return itemText;
	}

	getItemsCopy(limit) {
		const items = this.props.scale.items;
		const returnArray = [];
		for(var i = 0; i < items.length && i < limit; i++) {
			returnArray[i] = items[i];
		}
		return returnArray;
	}

}
