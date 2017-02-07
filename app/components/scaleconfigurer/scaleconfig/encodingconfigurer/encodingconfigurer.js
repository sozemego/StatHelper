import React from "react";

//COMPONENTS
import EncodingCreator from "./encodingcreator/encodingcreator";
import EncodingView from "./encodingview/encodingview";

/**
	A component which allows to configure encodings. Encodings define
	how item answers are translated into scores. 
*/
export default class EncodingConfigurer extends React.Component {

	constructor(props) {
		super(props);
		this.removeEncoding = this.removeEncoding.bind(this);
		this.state = {};
	}

	render() {
		const scale = this.props.scale;

		return(
				<div className = "container">
					<p className = "lead text-center">Encodings</p>
					<div className = "row">
						<div className = "col-lg-6">
							<EncodingCreator scale = {scale}/>
						</div>
						<div className = "col-lg-6">
							<p className="lead text-center">View</p>
							<EncodingView scale = {scale} remove = {this.removeEncoding}/>
						</div>
					</div>
				</div>
		);
	}

	removeEncoding(index) {
		this.props.scale.encodings.splice(index, 1);
	}

}
