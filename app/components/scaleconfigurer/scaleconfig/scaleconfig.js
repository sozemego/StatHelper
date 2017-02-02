import React from "react";

//COMPONENTS
import ScaleInfo from "./scaleinfo/scaleinfo";
import EncodingConfigurer from "./encodingconfigurer/encodingconfigurer";
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
			</div>
		);
	}

}
