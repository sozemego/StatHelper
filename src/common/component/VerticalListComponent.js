import React from 'react';

const dataContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'flex-start'
};

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

const selectedItem = Object.assign({}, item, {
  backgroundColor: 'rgba(0, 0, 0, 0.1)'
});

const header = {
  margin: 'auto',
  paddingBottom: '4px'
};

export default class VerticalListComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _getItemStyle = (itemIndex) => {
    const {selectedItems} = this.props;

    const index = selectedItems.findIndex((item) => {
      return item === itemIndex;
    });

    if (index === -1) {
      return item;
    } else {
      return selectedItem;
    }
  };


  render() {
    const {data} = this.props;
    return (
      <div style={dataContainer}>
        <h4 style={header}>Items</h4>
        {data.map((item, index) => {
          return <div
            style={this._getItemStyle(index)}
            onMouseDown={() => {
              this.props.startSelectingItems();
              this.props.toggleItem(index);
            }}
            onMouseEnter={() => this.props.toggleItem(index)}
            key={index}
          >
            {item} [{index}]
          </div>;
        })}
      </div>
    );
  }

}