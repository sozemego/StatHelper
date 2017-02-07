import React from "react";

//COMPONENTS
import ScaleConfig from "./scaleconfig/scaleconfig";

/**
	Component which allows to select a scale from
	an array of created ones and configure it.
*/
export default class ScaleConfigurer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {selectedScale: null};
		this.onButtonClick = this.onButtonClick.bind(this);
		this.getScaleButtons = this.getScaleButtons.bind(this);
		this.getSelectedScale = this.getSelectedScale.bind(this);
	}

	render() {
		const scales = this.props.getScales();

		if(scales.length === 0) {
			return null;
		}

		const scaleButtons = this.getScaleButtons();
		const selectedScale = this.getSelectedScale();

		return(
			<div className = "row text-center">
				<p className = "text-center lead">Scales:</p>
				{scaleButtons}
				{selectedScale}
			</div>
		);
	}

	getScaleButtons() {
		const scales = this.props.getScales();
		return scales.map(function(item, index) {
			return(
				<button onClick={this.onButtonClick.bind(null, index)} type="button" key={index}>{item.name}</button>
			);
		}.bind(this));
	}

	getSelectedScale() {
		if(this.state.selectedScale !== null) {
			const scales = this.props.getScales();
			return <ScaleConfig scale = {scales[this.state.selectedScale]} getScale = {this.props.getScale}/>;
		}
		return null;
	}

	onButtonClick(index) {
		this.setState({selectedScale: index});
	}

}
