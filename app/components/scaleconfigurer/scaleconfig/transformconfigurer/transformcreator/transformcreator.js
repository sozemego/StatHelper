import React from "react";

//COMPONENTS
import InputPair from "../../../../inputpair/inputpair";

export default class TransformCreator extends React.Component {

	constructor(props) {
		super(props);
		this.getTransform = this.getTransform.bind(this);
		this.getPairComponents = this.getPairComponents.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.pairChanged = this.pairChanged.bind(this);
		this.filterChanged = this.filterChanged.bind(this);
		this.levelChanged = this.levelChanged.bind(this);
		this.onCreateSimpleTransform = this.onCreateSimpleTransform.bind(this);
		this.onCreateMapTransform = this.onCreateMapTransform.bind(this);

		this.state = {
			pairs: [],
			filters: []
		};
	}

	render() {

		const transform = this.getTransform();

		return(
			<div>

				<p className = "text-center">Some scales require you to transform a raw score
					(or a range of scores) into a final score. Some have different scoring rules depending
					on variables like gender or age. This window is where you can define those transforms.
				</p>

				<div>
					<div>
						<span>Name</span><input onChange={this.onNameChange} type="text" placeholder="Transform name" value={transform.name}></input>
					</div>

				</div>
				{transform.pairs}
				<p className = "text-center">Filters</p>
				{transform.filters}
				<div className = "row">
					<button onClick={this.onCreateSimpleTransform}>Create transform</button>
					<button onClick={this.onCreateMapTransform}>Create score same as answer</button>
				</div>
				<div>
					<span>Level of measurement of the final score</span>
					<select onChange={this.levelChanged} value={transform.level}>
						<option value="ratio">Ratio</option>
						<option value="ordinal">Ordinal</option>
						<option value="nominal">Nominal</option>
					</select>
				</div>

			</div>
		);
	}

	getTransform() {
		return {
			name: this.state.name,
			pairs: this.getPairComponents(this.state.pairs, this.pairChanged),
			filters: this.getPairComponents(this.state.filters, this.filterChanged),
			level: this.state.level
		};
	}

	pairChanged(index, pair) {
		const pairs = this.state.pairs;
		pairs.splice(index, 1, pair);
		this.setState({pairs: pairs});
	}

	levelChanged(event) {
		this.setState({level: event.target.value});
	}

	onNameChange(event) {
		this.setState({name: event.target.value});
	}

	filterChanged(index, pair) {
		const filters = this.state.filters;
		filters.splice(index, 1, pair);
		this.setState({filters: filters});
	}

	getPairComponents(pairs, callback) {
		const config = {
			left: 6,
			right: 30,
			leftPlaceholder: "Raw score or range of scores",
			rightPlaceholder: "Transformed score"
		};
		const pairComponents = pairs.map(function(item, index) {
			return(
				<InputPair answer = {item.answer} result = {item.result}
					pairChanged = {callback} index = {index}  config = {config}/>
			);
		}.bind(this));

		const lastComponent = <InputPair answer = {""} result = {""}
		pairChanged = {callback} index = {pairComponents.length} config = {config}/>;
		pairComponents.push(lastComponent);

		return pairComponents;
	}

	onCreateSimpleTransform() {
		const name = this.state.name;
		if(!name || name === null || name === "") {
			return;
		}

		const filters = this.state.filters.slice();
		const level = this.state.level;

		const transform = {
			name: name,
			type: "simple",
			filters: filters,
			pairs: [],
			level: level
		};

		this.props.scale.transforms.push(transform);
	}

	onCreateMapTransform() {
		const name = this.state.name;
		if(!name || name === null || name === "") {
			return;
		}

		const filters = this.state.filters.slice();
		const transform = {
			name: name,
			type: "map",
			filters: filters,
			pairs: []
		};

		this.props.scale.transforms.push(transform);
	}

}
