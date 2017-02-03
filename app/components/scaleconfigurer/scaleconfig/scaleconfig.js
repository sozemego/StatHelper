import React from "react";

//COMPONENTS
import ScaleInfo from "./scaleinfo/scaleinfo";
import EncodingConfigurer from "./encodingconfigurer/encodingconfigurer";
import TransformConfigurer from "./transformconfigurer/transformconfigurer";
import Summary from "./summary/summary";
import Separator from "../../../components/separator/separator";

export default class ScaleConfig extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return(
			<div>
				<ScaleInfo scale = {this.props.scale} getScale = {this.props.getScale}/>
				<Separator />
				<EncodingConfigurer scale = {this.props.scale} />
				<Separator />
				<TransformConfigurer scale = {this.props.scale} />
				<Separator />
				<Summary scale = {this.props.scale} />
				<Separator />
			</div>
		);
	}

}
