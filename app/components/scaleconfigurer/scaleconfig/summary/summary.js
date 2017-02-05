import React from "react";

//COMPONENTS
import InputPair from "../inputpair/inputpair";

export default class Summary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			summaries: []
		};
	}

	render() {
		const scale = this.props.scale;
		const summaries = this.getSummaries();

		return(
			<div className = "container">
				<p className = "lead text-center">Summary</p>
				<p className = "text-center">On the left, input SCALE NAME you want to have summarized
					(descriptive statistics) and on the right, item indices you want the descriptives
					to be divided by. For instance, if you want your "Scale" results be summarized
					divided by gender, put "Scale" on the left and number of your item on the right.
					Item indices are displayed on the grid at the top.
					NOTE: If you just want to have descriptives for each scale without
					dividing by levels of other items, input nothing as it will be done anyway.</p>
				<div>
					{summaries}
				</div>
			</div>
		);
	}

	getSummaries() {
		const summaries = this.state.summaries;
		const config = {
			left: 30,
			right: 30,
			leftPlaceholder: "Scale name",
			rightPlaceholder: "Items"
		};
		const	boxes = summaries.map(function(item, index) {
			return(
				<InputPair answer = {item.answer} result = {item.result}
					pairChanged = {this.pairChanged} index = {index} config = {config}/>
			);
		}.bind(this));

		const lastBox = <InputPair answer = {""} result = {""}
			pairChanged = {this.pairChanged} index = {boxes.length} config = {config}/>;
		boxes.push(lastBox);

		return boxes;
	}

	pairChanged(index, pair) {
		const summaries = this.state.summaries;
		summaries.splice(index, 1, pair);
		this.setState({summaries: summaries});
	}
}
