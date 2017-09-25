import React from 'react';

const baseToolTipStyle = {
	position: 'fixed',
	zIndex: '1250',
	transform: 'translate(-50%, 0%)',
	backgroundColor: '#eee9e9',
	border: '1px solid black',
	borderRadius: '5px',
	padding: '4px',
	maxWidth: '400px'
};

export default class ToolTipComponent extends React.Component {

	constructor(props) {
		super(props);
		this._validateChildNode(props.children);
		this.state = {
			hover: false
		};
	}

	_validateChildNode = (children) => {
		if (!children || children instanceof Array) {
			throw new Error('ToolTip should wrap a valid, singular node.');
		}
	};

	_onMouseEnter = () => {
		this.setState({hover: true});
	};

	_onMouseLeave = () => {
		this.setState({hover: false});
	};

	_getChildBounds() {
		return this.refs.tooltip.getBoundingClientRect();
	}

	_getToolTipStyle = () => {
		const {hover} = this.state;
		if (!hover) {
			return Object.assign({}, baseToolTipStyle, {display: 'none'});
		} else {
			const rect = this._getChildBounds();
			return Object.assign({}, baseToolTipStyle, {left: rect.left, top: rect.top + rect.height});
		}
	};

	render() {
		const toolTipStyle = this._getToolTipStyle();
		return (
			<div onMouseEnter={this._onMouseEnter}
				 onMouseLeave={this._onMouseLeave}
				 style={this.props.style || {}}>
				<div ref='tooltip'>
					{this.props.children}
				</div>
				<div style={toolTipStyle}>
					{this.props.tooltip}
				</div>
			</div>
		);
	}

}