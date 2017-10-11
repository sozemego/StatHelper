import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui';

export class FrequenciesTableComponent extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  _getStrippedStyle = index => {
    return {backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#E0E0E0'};
  };

  render() {
    const {frequencies} = this.props;
    return (
      <Table
        selectable={false}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
              Frequencies
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Value</TableHeaderColumn>
            <TableHeaderColumn>Count</TableHeaderColumn>
            <TableHeaderColumn>Percent</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          stripedRows={false}
          preScanRows={false}
          showRowHover={true}
        >
          {frequencies.map((frequency, index) => {
            return <TableRow key={index} style={this._getStrippedStyle(index)}>
              <TableRowColumn>{frequency.value}</TableRowColumn>
              <TableRowColumn>{frequency.count}</TableRowColumn>
              <TableRowColumn>{frequency.percent}%</TableRowColumn>
            </TableRow>;
          })}
        </TableBody>
      </Table>
    );
  }

}