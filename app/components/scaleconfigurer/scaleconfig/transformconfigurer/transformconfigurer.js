import React from "react";

//COMPONENTS
import TransformCreator from "./transformcreator/transformcreator";
import TransformView from "./transformview/transformview";

export default class TransformConfigurer extends React.Component {

	constructor(props) {
		super(props);
		this.removeTransform = this.removeTransform.bind(this);
	}

	render() {
		const scale = this.props.scale;

		return(
			<div className = "container">
				<p className = "lead text-center">Transforms</p>
				<div className = "row">
					<div className = "col-lg-6">
						<TransformCreator scale = {scale}/>
					</div>
					<div className = "col-lg-6">
						<TransformView scale = {scale} remove = {this.removeTransform}/>
					</div>
				</div>
			</div>
		);
	}

	removeTransform(index) {
		this.props.scale.transforms.splice(index, 1);
	}

}
