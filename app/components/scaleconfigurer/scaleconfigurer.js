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
		this.state = {
			selectedScale: -1
		};
	}

	render() {
		const scales = this.props.scales;

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
		const scales = this.props.scales;
		return scales.map(function(item, index) {
			return(
				<button onClick={this.onButtonClick.bind(null, index)} type="button" key={index}>{item.name}</button>
			);
		}.bind(this));
	}

	getSelectedScale() {
		if(this.state.selectedScale !== -1) {
			const scales = this.props.scales;
			const scale = scales[this.state.selectedScale];
			return <ScaleConfig scale = {scale} scales = {scales}/>;
		}
		return null;
	}

	onButtonClick(index) {
		this.setState({selectedScale: index});
	}

}
