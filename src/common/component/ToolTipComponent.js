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
    this._validateChildren(props.children);
    this.state = {
      hover: false
    };
  }

  _validateChildren = (children) => {
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
    const {
      children,
      tooltip,
      style
    } = this.props;

    const {
      _onMouseEnter,
      _onMouseLeave,
      _getToolTipStyle
    } = this;

    return (
      <div onMouseEnter={_onMouseEnter}
           onMouseLeave={_onMouseLeave}
           style={style || {}}>
        <div ref='tooltip'>
          {children}
        </div>
        <div style={_getToolTipStyle()}>
          {tooltip}
        </div>
      </div>
    );
  }

}