import React from 'react';
import {connect} from 'react-redux';
import {
  createTest,
  removeTest,
  selectTest,
  setTestName,
  setTestType,
  startSelectingScales,
  toggleScale
} from '../actions/experimental-design-actions';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';
import {RaisedButton} from 'material-ui';
import TestConfigurerComponent from './TestConfigurerComponent';
import VerticalListComponent from '../../common/component/VerticalListComponent';
import {mouseUp} from '../../common/actions/common-actions';

const containerStyle = {
  display: 'flex'
};

const verticalListContainerStyle = {
  width: '30%'
};

const designContainerStyle = {
  width: '70%'
};

const buttonStyle = {
  margin: 'auto',
  width: '100%'
};

class ExperimentalDesignContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  _getSelectedTest = () => {
    return this.props.tests[this.props.selectedTest];
  };

  _getSelectedTestScales = () => {
    const selectedTest = this._getSelectedTest();
    return selectedTest ? selectedTest.scales : [];
  };

  render() {
    const {
      selectedTest,
      scales,
      mouseUp,
      toggleScale,
      startSelectingScales,
      createTest
    } = this.props;
    const scaleNames = scales.map(scale => scale.name);

    return (
      <div style={containerStyle} onMouseUp={mouseUp}>
        <div style={verticalListContainerStyle}>
          <VerticalListComponent
            data={scaleNames}
            selectedItems={this._getSelectedTestScales()}
            toggleItem={toggleScale}
            startSelectingItems={startSelectingScales}
          />
        </div>
        <div style={designContainerStyle}>
          <RaisedButton
            label="New test"
            style={buttonStyle}
            onTouchTap={() => createTest()}
          />
          <SelectableElementCollectionComponent
            selectElement={this.props.selectTest}
            elements={this.props.tests.map(test => test.name)}
            selectedElementIndex={selectedTest}
          />
          <TestConfigurerComponent
            selectedTest={this.props.tests[selectedTest]}
            setTestName={this.props.setTestName.bind(null, selectedTest)}
            setTestType={this.props.setTestType.bind(null, selectedTest)}
            removeTest={this.props.removeTest.bind(null, selectedTest)}
          />
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const {scales, experimentalDesign} = state;
  return {
    scales: scales.scales,
    tests: experimentalDesign.tests,
    selectedTest: experimentalDesign.selectedTest
  };
};

const dispatchToProps = (dispatch) => {
  return {
    startSelectingScales: () => {
      dispatch(startSelectingScales());
    },
    mouseUp: () => {
      dispatch(mouseUp());
    },
    toggleScale: scaleIndex => {
      dispatch(toggleScale(scaleIndex));
    },
    createTest: () => {
      dispatch(createTest());
    },
    selectTest: index => {
      dispatch(selectTest(index));
    },
    setTestName: (testIndex, testName) => {
      dispatch(setTestName(testIndex, testName));
    },
    setTestType: (testIndex, testType) => {
      dispatch(setTestType(testIndex, testType));
    },
    removeTest: testIndex => {
      dispatch(removeTest(testIndex));
    },
  };
};

export default connect(mapStateToProps, dispatchToProps)(ExperimentalDesignContainer);