import React from "react";

//COMPONENTS
import InputPair from "../../inputpair/inputpair";

//CSS
import styles from "./encodingcreator.css";

export default class EncodingCreator extends React.Component {

	constructor(props) {
		super(props);
		this.getEncoding = this.getEncoding.bind(this);
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
			pairs: []
		};
	}

	render() {

		const encoding = this.getEncoding();

		return(
			<div>

				<p className = "text-center">Define your encodings here. What are encodings?
					Simply put, they map answers to scores. For most scales, the answer is the score.
					It is possible however, that you have answers like "most likely" in your scales, you can map those
					answers to nice numerical values.
				</p>

				<div>
					<div>
						<span>Name</span><input onChange={this.onNameChange} type="text" placeholder="Encoding name" value={encoding.name}></input>
					</div>

					<div>
						<span>Items</span><input onChange={this.onItemsChange} type="text" placeholder="Items" value = {encoding.items}></input>
						<span>Leave empty for all items. Separate items with spaces or commas.</span>
					</div>

				</div>
				{encoding.pairs}
				<div className = "row">
					<button onClick={this.onCreateSimpleEncoding}>Create encoding</button>
					<button onClick={this.onCreateMapEncoding}>Create score same as answer</button>
					<div className = "row">
						<button onClick={this.onCreateReverseEncoding}>Create reverse encoding</button>
						<div>
							<span>Lowest possible answer</span>
							<input onChange={this.onMinChange} type="text" value={encoding.min}></input>
						</div>
						<div>
							<span>Highest possible answer</span>
							<input onChange={this.onMaxChange} type="text" value={encoding.max}></input>
						</div>
						<button onClick={this.onClear}>Clear all</button>
					</div>
				</div>
			</div>
		);
	}

	getEncoding() {
		return {
			name: this.state.name,
			items: this.state.items,
			min: this.state.min,
			max: this.state.max,
			pairs: this.getFilledBoxes(this.state.pairs)
		};
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

	getFilledBoxes(pairs) {
		let boxes = [];

		if(pairs.length > 0) {
			boxes = pairs.map(function(item, index) {
				return(
					<InputPair answer = {item.answer} result = {item.result}
						pairChanged = {this.pairChanged} index = {index}/>
				);
			}.bind(this));
		}

		const lastBox = <InputPair answer = {""} result = {""}
			pairChanged = {this.pairChanged} index = {boxes.length}/>;
		boxes.push(lastBox);

		return boxes;
	}

	pairChanged(index, pair) {
		const pairs = this.state.pairs;
		pairs.splice(index, 1, pair);
		this.setState({pairs: pairs});
	}

	onCreateSimpleEncoding() {
		const name = this.state.name;
		if(!name || name === null || name === "") {
			return;
		}

		const items = this.getItems();
		const pairs = this.state.pairs.slice();

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
			pairs: []
		});
	}

}
