import React from "react";

/**
	Displays data about an encoding. Also allows removal of encodings.
*/
export default class EncodingView extends React.Component {

	constructor(props) {
		super(props);
		this.getButtons = this.getButtons.bind(this);
		this.onClick = this.onClick.bind(this);
		this.getSelectedEncoding = this.getSelectedEncoding.bind(this);
		this.getItemsElement = this.getItemsElement.bind(this);
		this.getPairs = this.getPairs.bind(this);
		this.getMinMax = this.getMinMax.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.state = {selectedEncodingIndex: -1};
	}

	render() {
		const buttons = this.getButtons();
		const selectedEncoding = this.getSelectedEncoding();

		return(
			<div>
				<div className = "row">
					{buttons}
				</div>
				<div>
					{selectedEncoding}
				</div>
			</div>
		);
	}

	getButtons() {
		const encodings = this.props.scale.encodings;

		return encodings.map(function(item, index) {
			return(
					<button onClick={this.onClick.bind(null, index)}>{item.name}</button>
			);
		}.bind(this));
	}

	getSelectedEncoding() {
		const selectedEncodingIndex = this.state.selectedEncodingIndex;
		if(selectedEncodingIndex === -1) {
			return null;
		}

		const encoding = this.props.scale.encodings[selectedEncodingIndex];
		if(!encoding) {
			return null;
		}
		const items = this.getItemsElement(selectedEncodingIndex);
		const pairs = this.getPairs(selectedEncodingIndex);
		const minMax = this.getMinMax(selectedEncodingIndex);

		return(
			<div>
				<p className="text-center">Name: {encoding.name}</p>
				<p className="text-center">Type: {encoding.type}</p>
				{minMax}
				<div>Items: {items}</div>
				<div>{pairs}</div>
				<div className = "row">
					<button onClick = {this.onRemove.bind(null, selectedEncodingIndex)}>Remove</button>
				</div>
			</div>
		);
	}

	getItemsElement(selectedEncodingIndex) {
		const encoding = this.props.scale.encodings[selectedEncodingIndex];
		const numberOfItems = encoding.items.length;
		let items = "All";
		if(numberOfItems > 0) {
			items = "";
			items = encoding.items.join(" ");
		}
		return <span>{items}</span>;
	}

	getPairs(selectedEncodingIndex) {
		const encoding = this.props.scale.encodings[selectedEncodingIndex];
		const pairs = encoding.pairs;

		return pairs.map(function(item, index) {
			return(
				<p>[{item.answer}] -> [{item.result}]</p>
			);
		});
	}

	getMinMax(selectedEncodingIndex) {
		const encoding = this.props.scale.encodings[selectedEncodingIndex];
		const min = encoding.min;
		const max = encoding.max;
		if(!min || min === null || min === "") {
			return null; /** Only check min, because encoding creator does not allow
			for encoding to be created if both min and max aren't set */
		}
		return(
			<span>Min [{min}] max [{max}]</span>
		);
	}

	onClick(index) {
		this.setState({selectedEncodingIndex: index});
	}

	onRemove(index) {
		this.props.remove(index);
		this.setState({selectedEncodingIndex: -1});
	}

}
