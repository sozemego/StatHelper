import React from "react";

import EncodingCreator from "./encodingcreator/encodingcreator";
import EncodingView from "./encodingview/encodingview";

export default class EncodingConfigurer extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const scale = this.props.scale;

		return(
				<div className = "container">
					<p className = "lead text-center">Encodings</p>
					<div className = "row">
						<div className = "col-lg-6">
							<EncodingCreator scale = {scale} />
						</div>
						<div className = "col-lg-6">
							<EncodingView scale = {scale} />
						</div>
					</div>
				</div>
		);
	}
}
