import React from 'react';
import {hideChart} from '../actions/actions';
import {connect} from 'react-redux';

export class ChartsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          {this.props.show}
        </div>
        <div>
          {this.props.chartType}
        </div>
        <div>
          {this.props.data}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {chart} = state;
  return {
    show: chart.show,
    chartType: chart.chartType,
    data: chart.data
  };
};

const dispatchToProps = dispatch => {
  return {
    hideChart: () => dispatch(hideChart())
  };
};

export default connect(mapStateToProps, dispatchToProps)(ChartsContainer);