import React from "react";

//COMPONENTS
import TransformCreator from "./transformcreator/transformcreator";
import TransformView from "./transformview/transformview";

/**
	A component responsible for creating and viewing transforms. Transforms
	transform a scale raw score into final score. Transforms can be filtered by
	other items (e.g. different transform for males and females). Transform also
	have to specify level of measurment for the final score.
*/
export default class TransformConfigurer extends React.Component {

	constructor(props) {
		super(props);
		this.removeTransform = this.removeTransform.bind(this);
		this.onTransformCreate = this.onTransformCreate.bind(this);
	}

	render() {
		const scale = this.props.scale;

		return(
			<div className = "container">
				<p className = "lead text-center">Transforms</p>
				<div className = "row">
					<div className = "col-lg-6">
						<TransformCreator onTransformCreate = {this.onTransformCreate}/>
					</div>
					<div className = "col-lg-6">
						<p className="lead text-center">View</p>
						<TransformView scale = {scale} remove = {this.removeTransform}/>
					</div>
				</div>
			</div>
		);
	}

	removeTransform(index) {
		this.props.scale.transforms.splice(index, 1);
	}

	onTransformCreate(transform) {
		this.props.scale.transforms.push(transform);
		this.setState({});
	}

}
