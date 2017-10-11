import React from 'react';

const item = {
  padding: '4px',
  margin: '2px',
  textAlign: 'center',
  fontSize: '0.85em',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  khtmlUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  cursor: 'pointer'
};

export default class ScaleDisplayComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _scaleNames = () => {
    return this.props.scales.map(scale => scale.name);
  };

  render() {
    const scaleNames = this._scaleNames();
    return (
      <div>
        {scaleNames.map((name, index) => {
          return <div
            style={item}
            key={index}
          >
            {name}
          </div>;
        })}
      </div>
    );
  }

}