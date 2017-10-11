import React from 'react';

const dataContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'flex-start'
};

const itemStyle = {
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

const selectedItemStyle = Object.assign({}, itemStyle, {
  backgroundColor: 'rgba(0, 0, 0, 0.1)'
});

const headerStyle = {
  margin: 'auto',
  paddingBottom: '4px'
};

export default class VerticalListComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _getItemStyle = (itemIndex) => {
    const {selectedItems} = this.props;

    const index = selectedItems.findIndex(item => {
      return item === itemIndex;
    });

    return index === -1 ? itemStyle : selectedItemStyle;
  };

  _getListElements = () => {
    const {
      data,
      startSelectingItems,
      toggleItem
    } = this.props;

    return data.map((item, index) => {
      return <div
        style={this._getItemStyle(index)}
        onMouseDown={() => {
          startSelectingItems();
          toggleItem(index);
        }}
        onMouseEnter={() => toggleItem(index)}
        key={index}
      >
        {item} [{index}]
      </div>
    })
  };


  render() {
    const {
      _getListElements
    } = this;

    return (
      <div style={dataContainerStyle}>
        <h4 style={headerStyle}>Items</h4>
        {_getListElements()};
      </div>
    );
  }

}