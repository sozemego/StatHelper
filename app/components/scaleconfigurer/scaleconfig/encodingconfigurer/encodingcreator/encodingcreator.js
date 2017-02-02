import React from "react";

//COMPONENTS
import EncodingPair from "./encodingpair/encodingpair";

//CSS
import styles from "./encodingcreator.css";

export default class EncodingCreator extends React.Component {

	constructor(props) {
		super(props);
		this.getFilledBoxes = this.getFilledBoxes.bind(this);
		this.pairChanged = this.pairChanged.bind(this);
		this.onCreateSimpleEncoding = this.onCreateSimpleEncoding.bind(this);
		this.onCreateMapEncoding = this.onCreateMapEncoding.bind(this);
		this.onCreateReverseEncoding = this.onCreateReverseEncoding.bind(this);
		this.getItems = this.getItems.bind(this);
		this.onClear = this.onClear.bind(this);
		this.onItemsChange = this.onItemsChange.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onMinChange = this.onMinChange.bind(this);
		this.onMaxChange = this.onMaxChange.bind(this);
		this.state = {
			filledPairs: []
		};
	}

	render() {

		const boxes = this.getFilledBoxes();

		return(
			<div>

				<p className = "text-center">Define your encodings here. What are encodings?
					Simply put, they map answers to scores. For most scales, the answer is the score.
					It is possible however, that you have answers like "most likely" in your scales, you can map those
					answers to nice numerical values.
				</p>

				<div>
					<div>
						<span>Name</span><input onChange={this.onNameChange} type="text" placeholder="Encoding name" value={this.state.name}></input>
					</div>

					<div>
						<span>Items</span><input onChange={this.onItemsChange} type="text" placeholder="Items"></input>
						<span>Leave empty for all items. Separate items with spaces or commas.</span>
					</div>

				</div>
				{boxes}
				<div className = "row">
					<button onClick={this.onCreateSimpleEncoding}>Create encoding</button>
					<button onClick={this.onCreateMapEncoding}>Create score same as answer</button>
					<div className = "row">
						<button onClick={this.onCreateReverseEncoding}>Create reverse encoding</button>
						<div>
							<span>Lowest possible answer</span>
							<input onChange={this.onMinChange} type="text"></input>
						</div>
						<div>
							<span>Highest possible answer</span>
							<input onChange={this.onMaxChange} type="text"></input>
						</div>
						<button onClick={this.onClear}>Clear all</button>
					</div>
				</div>
			</div>
		);
	}

	onNameChange(event) {
		this.setState({name: event.target.value});
	}

	onItemsChange(event) {
		this.setState({items: event.target.value});
	}

	onMinChange(event) {
		this.setState({min: event.target.value});
	}

	onMaxChange(event) {
		this.setState({max: event.target.value});
	}

	getFilledBoxes() {
		const filledPairs = this.state.filledPairs;

		const boxes = filledPairs.map(function(item, index) {
			return(
				<EncodingPair answer = {item.answer} result = {item.result}
					pairChanged = {this.pairChanged} index = {index}/>
			);
		}.bind(this));

		const lastBox = <EncodingPair answer = {""} result = {""}
			pairChanged = {this.pairChanged} index = {boxes.length}/>;
		boxes.push(lastBox);

		return boxes;
	}

	pairChanged(index, pair) {
		const filledPairs = this.state.filledPairs;
		filledPairs.splice(index, 1, pair);
		this.setState({filledPairs: filledPairs});
	}

	onCreateSimpleEncoding() {
		const name = this.state.name;
		if(!name || name === null || name === "") {
			return;
		}

		const items = this.getItems();
		const pairs = this.state.filledPairs.slice();

		const encoding = {
			name: name,
			type: "simple",
			items: items,
			pairs: pairs
		};

		this.props.scale.encodings.push(encoding);
	}

	onCreateMapEncoding() {
		const name = this.state.name;
		if(!name || name === null || name === "") {
			return;
		}

		const items = this.getItems();
		const encoding = {
			name: name,
			type: "map",
			items: items,
			pairs: []
		};

		this.props.scale.encodings.push(encoding);
	}

	onCreateReverseEncoding() {
		const name = this.state.name;
		if(!name || name === null || name === "") {
			return;
		}

		const min = this.state.min;
		const max = this.state.max;
		if(!min || min === null || min === "" || !max || max === null || max === "") {
			return;
		}

		const items = this.getItems();

		const encoding = {
			name: name,
			type: "reverse",
			min: min,
			max: max,
			items: items,
			pairs: []
		};

		this.props.scale.encodings.push(encoding);
	}

	getItems() {
		const items = [];
		const itemsString = this.state.items;
		if(itemsString) {
			const result = itemsString.match(/\d+/g);
			if(result !== null) {
				for(var i = 0; i < result.length; i++) {
					items.push(result[i]);
				}
			}
		}
		return items;
	}

	onClear() {
		this.setState({
			filledPairs: []
		});
	}

	onEdit(encoding) {
		this.setState({
			name: encoding.name,
			min: encoding.min,
			max: encoding.max,
			filledPairs: encoding.filledPairs.slice(),
			items: encoding.items
		});
	}

}
