import React from "react";

import EncodingCreator from "./encodingcreator/encodingcreator";

export default class EncodingConfigurer extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const scale = this.props.scale;

		return(
				<div className = "container-fluid">
					<p className = "lead text-center">Encodings</p>
					<div className = "row">
						<div className = "col-lg-3">
							<EncodingCreator scale = {scale} />
						</div>
					</div>
				</div>
		);
	}
}
