import React from "react";

/**
	Displays info about a transform. Allows for transform removal.
*/
export default class TransformView extends React.Component {

	constructor(props) {
		super(props);
		this.getButtons = this.getButtons.bind(this);
		this.getSelectedTransform = this.getSelectedTransform.bind(this);
		this.getPairs = this.getPairs.bind(this);
		this.getFilters = this.getFilters.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.state = {selectedTransformIndex: -1};
	}

	render() {
		const buttons = this.getButtons();
		const selectedTransform = this.getSelectedTransform();

		return(
			<div>
				<div className = "row">
					{buttons}
				</div>
				<div>
					{selectedTransform}
				</div>
			</div>
		);
	}

	getButtons() {
		const transforms = this.props.scale.transforms;

		return transforms.map(function(item, index) {
			return(
					<button onClick={this.onClick.bind(null, index)}>{item.name}</button>
			);
		}.bind(this));
	}

	getSelectedTransform() {
		const selectedTransformIndex = this.state.selectedTransformIndex;
		if(selectedTransformIndex === -1) {
			return null;
		}

		const transform = this.props.scale.transforms[selectedTransformIndex];
		if(!transform) {
			return null;
		}

		const pairs = this.getPairs(selectedTransformIndex);
		const filters = this.getFilters(selectedTransformIndex);

		return(
			<div>
				<p className="text-center">Name: {transform.name}</p>
				<p className="text-center">Type: {transform.type}</p>
				<div>
					<p className = "text-center">Transforms</p>
					{pairs}
				</div>
				<div>
					<p className = "text-center">Filters:</p>
					{filters}
				</div>
				<div className = "row">
					<button onClick = {this.onRemove.bind(null, selectedTransformIndex)}>Remove</button>
				</div>
			</div>
		);
	}

	getPairs(selectedTransformIndex) {
		const transform = this.props.scale.transforms[selectedTransformIndex];
		const pairs = transform.pairs;

		const pairElements = pairs.map(function(item, index) {
			return(
				<p>[{item.answer}] -> [{item.result}]</p>
			);
		});

		return pairElements;
	}

	getFilters(selectedTransformIndex) {
		const transform = this.props.scale.transforms[selectedTransformIndex];
		const filters = transform.filters;

		const filterElements = filters.map(function(item, index) {
			return(
				<p>[{item.answer}] -> [{item.result}]</p>
			);
		});
		if(filterElements.length === 0) {
			return(<p>None</p>);
		}
		return filterElements;
	}

	onClick(index) {
		this.setState({selectedTransformIndex: index});
	}

	onRemove(index) {
		this.props.remove(index);
		this.setState({selectedTransformIndex: -1});
	}

}
