import React from "react";

/**
	Displays IndependentVariable groups.
*/
export default class IndependentVariableView extends React.Component {

	constructor(props) {
		super(props);
		this.getButtons = this.getButtons.bind(this);
		this.getSelectedGroup = this.getSelectedGroup.bind(this);
		this.onClick = this.onClick.bind(this);
		this.getSelectedGroupItems = this.getSelectedGroupItems.bind(this);
		this.getRemoveButton = this.getRemoveButton.bind(this);
		this.state = {selectedGroup: -1};
	}

	render() {
		const buttons = this.getButtons();
		const selectedGroup = this.getSelectedGroup();
		const removeButton = this.getRemoveButton();
		return (
			<div>
				<p className="lead text-center">View</p>
				<div className = "row">
					{buttons}
				</div>
				<div className = "text-center">
					{selectedGroup}
					{removeButton}
				</div>
			</div>
		);
	}

	getButtons() {
		return this.props.groups.map(function(item, index) {
			return(
					<button className = "col-xs-1" onClick={this.onClick.bind(null, index)}>{item.name}</button>
			);
		}.bind(this));
	}

	onClick(index) {
		this.setState({selectedGroup: index});
	}

	getSelectedGroup() {
		const group = this.props.groups[this.state.selectedGroup];
		if(!group) {
			return;
		}

		const items = this.getSelectedGroupItems();
		return(
			<div>
				<p className="text-center">Items</p>
				{items}
				<span>Type: {group.type}</span>
			</div>
		);
	}

	getSelectedGroupItems() {
		const group = this.props.groups[this.state.selectedGroup];
		return group.variables.map(function(item, index) {
			return(
				<p>{item.item} -> {item.level}</p>
			);
		});
	}

	getRemoveButton() {
		const selectedGroup = this.state.selectedGroup;
		if(selectedGroup === -1) {
			return null;
		}

		return(
			<button onClick={this.props.onRemove.bind(null, {selectedGroup})}>Remove</button>
		);
	}

}
