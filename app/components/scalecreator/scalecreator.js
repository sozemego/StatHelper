import React from "react";

//UTILS
import ExperimentalDesign from "../../experimentaldesign/experimentaldesign";

//CSS
import styles from "./scalecreator.css";


export default class ScaleCreator extends React.Component {

	constructor(props) {
		super(props);
		this.createScale = this.createScale.bind(this);
		this.createSubscale = this.createSubscale.bind(this);
	}

	render() {

		const data = this.props.data; /* should probably not be here? */
		if(!data) {
			return null;
		}

		const scaleNames = this.getScales();

		return(
			<div className = "container text-center">
				<span>Name of the scale:</span>
				<input className = {styles.input_field} type="text" size="40" placeholder="Name of the scale/subscale" ref="scalename"></input>
				<button type="button" onClick={this.createScale}>Create a new scale</button>

				<button type="button" onClick={this.createSubscale}>Create a subscale of selected scale</button>
				<select ref="selectedscale">
					{scaleNames}
				</select>

			</div>
		);

	}

	createScale() {
		const scaleName = this.refs.scalename.value;
		this.props.onAddScale(scaleName);
		this.forceUpdate();
	}

	createSubscale() {
		const scaleName = this.refs.scalename.value;
		const parentScale = this.refs.selectedscale.selectedIndex;
		this.props.onAddScale(scaleName, parentScale);
		this.forceUpdate();
	}

	getScales() {
		const scales = this.props.getScales();
		let scaleNames = [];
		for(var i = 0; i < scales.length; i++) {
			scaleNames.push(<option key={i} value={scales[i].name}>{scales[i].name}</option>);
		}
		return scaleNames;
	}

}
