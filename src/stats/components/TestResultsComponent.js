import React from 'react';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';
import {Paper} from 'material-ui';
import {CORRELATION} from '../../experimental-design/model/test-constants';
import {CorrelationTestResultComponent} from './CorrelationTestResultComponent';
import {SpinnerComponent} from '../../common/component/SpinnerComponent';

const resultComponentMap = {
  [CORRELATION]: CorrelationTestResultComponent
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
    const {tests, runningTests} = this.props;
    return (
      <div>
        <SelectableElementCollectionComponent selectElement={this.jumpToIndex}
                                              elements={tests.map(test => test.name)}/>
        {runningTests.map((test, index) => {
          return <div id={test.name} key={index} style={{display: 'flex', margin: '10px 0px 0px 40px'}}>
            <div style={{
              width: '15%',
              backgroundColor: '#BDBDBD',
              textAlign: 'center',
              fontSize: '1.25rem',
              paddingTop: '4px'
            }}>{test.name}</div>
            <Paper zDepth={1} style={{width: '85%'}}>{this._getTestComponent(test)}</Paper>
          </div>;
        })}
      </div>
    );
  }

}