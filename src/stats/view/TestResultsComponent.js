import React from 'react';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';
import {Paper} from 'material-ui';
import {CORRELATION} from '../../experimental-design/model/test-constants';
import {CorrelationTestResultComponent} from './CorrelationTestResultComponent';
import {SpinnerComponent} from '../../common/component/SpinnerComponent';

const resultComponentMap = {
  [CORRELATION]: CorrelationTestResultComponent
};

const runningTestContainerStyle = {
  display: 'flex', margin: '10px 0px 0px 40px'
};

const testNameStyle = {
  width: '15%',
  backgroundColor: '#BDBDBD',
  textAlign: 'center',
  fontSize: '1.25rem',
  paddingTop: '4px'
};

const testResultContainerStyle = {
  width: '85%'
};

export class TestResultsComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _getTestComponent = test => {
    if (test.results) {
      return React.createElement(resultComponentMap[test.type], {
        test,
        minSignificance: this.props.minSignificance
      }, null);
    } else {
      return <SpinnerComponent/>;
    }
  };

  jumpToIndex = index => {
    location.href = '#' + this.props.tests.find((test, i) => index === i).name;
    history.replaceState(null, null, location.href);
  };

  render() {
    const {
      tests,
      runningTests
    } = this.props;

    const {
      jumpToIndex,
      _getTestComponent
    } = this;

    const testNames = tests.map(test => test.name);

    return (
      <div>
        <SelectableElementCollectionComponent selectElement={jumpToIndex}
                                              elements={testNames}/>
        {runningTests.map((test, index) => {
          return <div id={test.name} key={index} style={runningTestContainerStyle}>
            <div style={testNameStyle}>{test.name}</div>
            <Paper zDepth={1} style={testResultContainerStyle}>{_getTestComponent(test)}</Paper>
          </div>;
        })}
      </div>
    );
  }

}