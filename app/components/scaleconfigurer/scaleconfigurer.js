import React from "react";

//COMPONENTS
import ScaleConfig from "./scaleconfig/scaleconfig";

export default class ScaleConfigurer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {selectedScale: null};
		this.onButtonClick = this.onButtonClick.bind(this);
	}

	render() {
		const scales = this.props.getScales();

		if(scales.length === 0) {
			return null;
		}

		const scaleButtons = scales.map(function(item, index) {
			return(
				<button onClick={this.onButtonClick.bind(null, index)} type="button" key={index}>{item.name}</button>
			);
		}.bind(this));

		let selectedScale;
		if(this.state.selectedScale !== null) {
			selectedScale = <ScaleConfig scale = {scales[this.state.selectedScale]}/>;
		}

		return(
			<div className = "row text-center">
				<p className = "text-center lead">Scales:</p>
				{scaleButtons}
				{selectedScale}
			</div>
		);
	}

	onButtonClick(index) {
		this.setState({selectedScale: index});
	}

}
