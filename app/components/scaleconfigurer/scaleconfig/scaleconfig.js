import React from "react";

//COMPONENTS
import ScaleInfo from "./scaleinfo/scaleinfo";

export default class ScaleConfig extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return(
			<div>
				<ScaleInfo scale = {this.props.scale} getScale = {this.props.getScale}/>
			</div>
		);
	}

}
