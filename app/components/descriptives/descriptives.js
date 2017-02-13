import React from "react";

//COMPONENTS
import InputPair from "../inputpair/inputpair";

/**
	A component which allows users to choose which scales should be
	described with some basic statistics (average, percentages, min/max etc).
	Also allows to divide the descriptions of scales by other items.
*/
export default class Descriptives extends React.Component {

	constructor(props) {
		super(props);
		this.pairChanged = this.pairChanged.bind(this);
	}

	render() {
		const descriptives = this.getDescriptives();

		return(
			<div className = "container">
				<p className = "lead text-center">Descriptive statistics</p>
				<p className = "text-center">On the left, input SCALE NAME you want to have summarized
					(descriptive statistics) and on the right, item indices you want the descriptives
					to be divided by. For instance, if you want your "Scale" results be summarized
					divided by gender, put "Scale" on the left and number of your item on the right.
					Item indices are displayed on the grid at the top.
					NOTE: If you just want to have descriptives for each scale without
					dividing by levels of other items, input nothing as it will be done anyway.</p>
				<div className = "text-center">
					{descriptives}
				</div>
			</div>
		);
	}

	getDescriptives() {
		const descriptives = this.props.descriptives;
		const config = {
			left: 30,
			right: 30,
			leftPlaceholder: "Scale name",
			rightPlaceholder: "Items"
		};
		const	boxes = descriptives.map(function(item, index) {
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
		if(!pair.answer || pair.answer === null || pair.answer === "") {
			return;
		}
		if(!pair.result || pair.result === null || pair.result === "") {
			return;
		}
		const descriptives = this.props.descriptives;
		descriptives.splice(index, 1, pair);
		this.setState({descriptives: descriptives});
	}
}
