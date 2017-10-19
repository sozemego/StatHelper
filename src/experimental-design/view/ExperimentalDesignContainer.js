import React from 'react';
import {connect} from 'react-redux';
import designSelectors from '../selectors';
import designOperations from '../operations';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';
import {RaisedButton} from 'material-ui';
import TestConfigurerComponent from './TestConfigurerComponent';
import VerticalListComponent from '../../common/component/VerticalListComponent';
import {mouseUp} from '../../common/actions/common-actions';
import scaleSelectors from '../../scales/selectors';
import {randomTestId} from '../model/test';

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
    return this.props.selectedTest;
  };

  _getSelectedTestScales = () => {
    const selectedTest = this._getSelectedTest();
    return selectedTest ? this._findSelectedScaleIndices(designSelectors.getTestScales(selectedTest)) : [];
  };

  _findSelectedScaleIndices(scaleIds) {
    const {
      scales
    } = this.props;

    return scaleIds.map((scaleId) => {
      return scales.findIndex((scale) => scaleSelectors.getScaleId(scale) === scaleId);
    });
  }

  render() {
    const {
      selectedTest,
      scales,
      mouseUp,
      toggleScale,
      startSelectingScales,
      createTest,
      selectTest,
      tests,
      setTestName,
      removeTest,
      setTestType
    } = this.props;

    const scaleNames = scales.map(scaleSelectors.getScaleName);
    const selectedTestId = selectedTest ? designSelectors.getTestId(selectedTest) : null;

    const {
      _getSelectedTest,
      _getSelectedTestScales
    } = this;

    return (
      <div style={containerStyle} onMouseUp={mouseUp}>
        <div style={verticalListContainerStyle}>
          <VerticalListComponent
            data={scaleNames}
            selectedItems={_getSelectedTestScales()}
            toggleItem={(index) => toggleScale(selectedTestId, scaleSelectors.getScaleId(scales[index]))}
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
            selectElement={(index) => selectTest(designSelectors.getTestId(tests[index]))}
            selectedElementIndex={tests.findIndex(test => designSelectors.getTestId(test) === selectedTestId)}
            elements={tests.map(test => test.name)}
          />
          <TestConfigurerComponent
            selectedTest={_getSelectedTest()}
            setTestName={(name) => setTestName(selectedTestId, name)}
            setTestType={(type) => setTestType(selectedTestId, type)}
            removeTest={() => removeTest(selectedTestId)}
          />
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const experimentalDesign = designSelectors.experimentalDesignRoot(state);
  return {
    scales: scaleSelectors.getScales(scaleSelectors.scaleRootSelector(state)),
    tests: designSelectors.getTests(experimentalDesign),
    selectedTest: designSelectors.getSelectedTest(experimentalDesign)
  };
};

const dispatchToProps = (dispatch) => {
  return {
    startSelectingScales: () => {
      dispatch(designOperations.startSelectingScales());
    },
    mouseUp: () => {
      dispatch(mouseUp());
    },
    toggleScale: (testId, scaleId) => {
      dispatch(designOperations.toggleScale(testId, scaleId));
    },
    createTest: () => {
      const testId = randomTestId();
      dispatch(designOperations.createTest(testId));
      dispatch(designOperations.selectTest(testId));
    },
    selectTest: testId => {
      dispatch(designOperations.selectTest(testId));
    },
    setTestName: (testId, testName) => {
      dispatch(designOperations.setTestName(testId, testName));
    },
    setTestType: (testId, testType) => {
      dispatch(designOperations.setTestType(testId, testType));
    },
    removeTest: testId => {
      dispatch(designOperations.removeTest(testId));
    },
  };
};

export default connect(mapStateToProps, dispatchToProps)(ExperimentalDesignContainer);