import React from "react";

/**
	Displays basic information about a scale.
*/
export default class ScaleInfo extends React.Component {

	constructor(props) {
		super(props);
		this.getItems = this.getItems.bind(this);
		this.getParentScale = this.getParentScale.bind(this);
		this.state = {
			displayedItemsLimit: 40 /** Items displayed before truncation */
		};
	}

	render() {
		const scale = this.props.scale;
		const parent = this.getParentScale();
		const items = this.getItems();

		return(
			<div className = "row">
				<div className = "col-md-4 lead">Name: {scale.name}</div>
				{parent}
				<div>Items: {items}</div>
			</div>
		);
	}

	/**
		Returns a list of items in this scale as a string, space separated.
	*/
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

	getParentScale() {
		const scale = this.props.scale;
		if(scale.parent !== undefined) {
			return <div className = "col-md-4 lead">Parent: {this.props.getScale(scale.parent).name}</div>;
		}
	}

	/**
		Returns at most limit of items.
	*/
	getItemsCopy(limit) {
		return this.props.scale.items.slice(0, limit);
	}

}
