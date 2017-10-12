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
        CHARTSCONTAINER
      </div>
    );
  }
}

const mapStateToProps = state => {
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, dispatchToProps)(ChartsContainer);