import React from 'react';
import {Chip} from 'material-ui';

const dataContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  justifyContent: 'center'
};

const elementStyle = {
  padding: '4px',
  margin: '2px',
  color: 'rgba(0, 0, 0, 0.87)',
  borderRadius: '4px'
};

export default class DataDisplayComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {
      itemNames
    } = this.props;

    return (
      <div style={dataContainerStyle}>
        {itemNames.map((name, index) => {
          return <Chip style={elementStyle} key={index}>{name}</Chip>;
        })}
      </div>
    );
  }

}