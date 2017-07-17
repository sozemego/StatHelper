import React from "react";
import {connect} from "react-redux";
import ScaleDisplayComponent from "./ScaleDisplayComponent";
import {
    createTest, removeTest, selectTest, setTestName, setTestType,
    startSelectingScales, toggleScale
} from "../actions/experimental-design-actions";
import SelectableElementCollectionComponent from "../../common/component/SelectableElementCollectionComponent";
import {RaisedButton} from "material-ui";
import TestConfigurerComponent from "./TestConfigurerComponent";
import VerticalListComponent from "../../common/component/VerticalListComponent";
import {mouseUp} from "../../common/actions/common-actions";

const container = {
    display: "flex"
};

const verticalListContainer = {
    width: "30%"
};

const designContainer = {
    width: "70%"
};

const button = {
    margin: "auto",
    width: "100%"
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
        return selectedTest ? selectedTest.scales: [];
    };

    render() {
        const {selectedTest: selectedTestIndex} = this.props;
        return(
            <div style={container} onMouseUp={this.props.mouseUp}>
                <div style={verticalListContainer}>
                    <VerticalListComponent
                        data={this.props.scales.map(scale => scale.name)}
                        selectedItems={this._getSelectedTestScales()}
                        toggleItem={this.props.toggleScale}
                        startSelectingItems={this.props.startSelectingScales}
                    />
                </div>
                <div style={designContainer}>
                    <RaisedButton
                        label="New test"
                        style={button}
                        onTouchTap={() => this.props.createTest()}
                    />
                    <SelectableElementCollectionComponent
                        selectElement={this.props.selectTest}
                        elements={this.props.tests.map(test => test.name)}
                        selectedElementIndex={selectedTestIndex}
                    />
                    <TestConfigurerComponent
                        selectedTest={this.props.tests[selectedTestIndex]}
                        setTestName={this.props.setTestName.bind(null, selectedTestIndex)}
                        setTestType={this.props.setTestType.bind(null, selectedTestIndex)}
                        removeTest={this.props.removeTest.bind(null, selectedTestIndex)}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const {scales, experimentalDesign} = state;
    return {
        scales: scales.scales,
        tests: experimentalDesign.tests,
        selectedTest: experimentalDesign.selectedTest
    }
};

const dispatchToProps = (dispatch) => {
    return {
        startSelectingScales: () => {
            dispatch(startSelectingScales());
        },
        mouseUp: () => {
            dispatch(mouseUp())
        },
        toggleScale: (scaleIndex) => {
            dispatch(toggleScale(scaleIndex));
        },
        createTest: () => {
            dispatch(createTest());
        },
        selectTest: (index) => {
            dispatch(selectTest(index));
        },
        setTestName: (testIndex, testName) => {
            dispatch(setTestName(testIndex, testName))
        },
        setTestType: (testIndex, testType) => {
            dispatch(setTestType(testIndex, testType))
        },
        removeTest: (testIndex) => {
            dispatch(removeTest(testIndex));
        },
    }
};

export default connect(mapStateToProps, dispatchToProps)(ExperimentalDesignContainer);