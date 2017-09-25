import React from 'react';
import {Chip} from 'material-ui';

const container = {
	display: 'flex',
	flexWrap: 'wrap',
	marginTop: '6px'
};

const selectedElement = {
	backgroundColor: 'orange'
};

export default class SelectableElementCollectionComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	_isElementSelected = (index) => {
		return this.props.selectedElementIndex === index;
	};

	render() {
		return (
			<div style={container}>
				{this.props.elements.map((element, index) => {
					return <Chip
						onTouchTap={() => this.props.selectElement(index)}
						key={index}
						style={this._isElementSelected(index) ? selectedElement : {}}
					>
						{element}
					</Chip>;
				})}
			</div>
		);
	}
}