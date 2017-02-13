import React from "react";

//COMPONENTS
import IndependentVariableCreator from "./independentvariablecreator/independentvariablecreator";
import IndependentVariableView from "./independentvariableview/independentvariableview";

/**
	A component for defining independent variables. Independent variables
	for instance are your experimental conditions (groups), or items like
	gender or age. Those variables can be grouped together, to define
	several test suites to run.
*/
export default class IndependentVariables extends React.Component {

	constructor(props) {
		super(props);
		this.onGroupCreate = this.onGroupCreate.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.state = {
			groups: props.groups,
			createdGroups: 0
		};
	}

	render() {

		return(
			<div className="container">
				<p className = "lead text-center">Independent Variables</p>
				<p className = "text-center">Independent variables are your items that
					you suspect will affect values of other items. These include your experimental conditions
					(e.g. control vs experimental group), age or gender. Those included in your experimental design
					(like experimental conditions) mark as design, additional items (age etc) mark as additional.
				</p>
				<div className = "row">
					<div className="col-lg-6">
						<IndependentVariableCreator onGroupCreate={this.onGroupCreate} />
					</div>
					<div className="col-lg-6">
						<IndependentVariableView groups = {this.state.groups} onRemove = {this.onRemove}/>
					</div>
				</div>
			</div>
		);
	}

	/**
		Callback for IV group creation. Used by IndependentVariableCreator.
	*/
	onGroupCreate(group) {
		group.name = this.state.createdGroups + 1;
		const lastGroups = this.state.groups;
		lastGroups.push(group);
		this.setState({
			groups: lastGroups,
			createdGroups: group.name
		});
	}

	onRemove(index) {
		const groups = this.state.groups;
		groups.splice(index, 1);
		this.setState({groups: groups});
	}

}
