import React from "react";

//UTILS
import ExperimentalDesign from "../../experimentaldesign/experimentaldesign";

//CSS
import styles from "./scalecreator.css";

/**
	Component for creating new scales from selected items (in DataDisplay).
*/
export default class ScaleCreator extends React.Component {

	constructor(props) {
		super(props);
		this.createScale = this.createScale.bind(this);
		this.createSubscale = this.createSubscale.bind(this);
		this.createScaleObject = this.createScaleObject.bind(this);
		this.levelChanged = this.levelChanged.bind(this);
		this.state = {
			level: "ratio"
		};
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
				<button type="button" onClick={this.createScale}>Create a scale</button>

				<button type="button" onClick={this.createSubscale} title="Tip: subscales cannot have subscales.">Create a subscale of:</button>
				<select ref="selectedscale">
					{scaleNames}
				</select>
				<div>
					<span>Level of measurement of the final score of this scale</span>
					<select onChange={this.levelChanged} value={this.state.level}>
						<option value="ratio">Ratio</option>
						<option value="ordinal">Ordinal</option>
						<option value="nominal">Nominal</option>
					</select>
				</div>
			</div>
		);

	}

	createScale() {
		const scaleName = this.refs.scalename.value;
		const scaleObject = this.createScaleObject(scaleName);
		if(!scaleObject) {
			return;
		}
		this.props.onAddScale(scaleObject);
	}

	createSubscale() {
		const scaleName = this.refs.scalename.value;
		const parentScaleIndex = this.refs.selectedscale.selectedIndex;
		const scaleObject = this.createScaleObject(scaleName, parentScaleIndex);
		if(!scaleObject) {
			return;
		}
		this.props.onAddScale(scaleObject);
	}

	createScaleObject(scaleName, parentScaleIndex) {
		if(!scaleName || scaleName === null || scaleName === "") {
			return;
		}

		const selectedItems = this.getSelectedItemsCopy();
		if(selectedItems.length === 0) {
			return;
		}

		const level = this.state.level;

		const scale = {
			name: scaleName,
			items: selectedItems,
			encodings: [],
			transforms: [],
			level: level
		};

		if(parentScaleIndex !== undefined) {
			scale.parent = parentScaleIndex;
		}

		return scale;
	}

	getSelectedItemsCopy() {
		return this.props.selectedItems.slice();
	}

	levelChanged(event) {
		this.setState({level: event.target.value});
	}

	getScales() {

		/** Filter out scales that have parents (i.e. are subscales), because they cannot
		have another subscales */
		const scales = this.props.scales.filter(function(scale) {
			return scale.parent === undefined;
		});

		let scaleNames = [];
		for(var i = 0; i < scales.length; i++) {
			scaleNames.push(<option key={i} value={scales[i].name}>{scales[i].name}</option>);
		}
		return scaleNames;
	}

}
