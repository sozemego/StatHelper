import React from "react";

export default class ScaleConfig extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const scaleName = this.props.scale.name;

		const items = this.props.scale.items.map(function(item, index) {
			return(
				<span>{item} </span>
			);
		});

		return(
			<div>
				<p className = "text-center">{scaleName}</p>
				<p>Items:</p>
				{items}
			</div>
		);
	}

}
