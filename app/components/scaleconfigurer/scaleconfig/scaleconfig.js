import React from "react";

//COMPONENTS
import ScaleInfo from "./scaleinfo/scaleinfo";
import EncodingConfigurer from "./encodingconfigurer/encodingconfigurer";
import TransformConfigurer from "./transformconfigurer/transformconfigurer";
import Separator from "../../../components/separator/separator";

/**
	A component for configuring the scale. It contains specific
	components for particular configurations (encodings and transforms).
*/
export default class ScaleConfig extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<ScaleInfo scale = {this.props.scale} scales = {this.props.scales}/>
				<Separator />
				<EncodingConfigurer scale = {this.props.scale} />
				<Separator />
				<TransformConfigurer scale = {this.props.scale} />
			</div>
		);
	}

}
