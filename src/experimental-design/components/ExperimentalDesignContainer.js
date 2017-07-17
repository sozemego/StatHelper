import React from "react";
import {connect} from "react-redux";
import ScaleDisplayComponent from "./ScaleDisplayComponent";
import {createTest, selectTest, setTestName} from "../actions/experimental-design-actions";
import SelectableElementCollectionComponent from "../../common/component/SelectableElementCollectionComponent";
import {RaisedButton} from "material-ui";
import TestConfigurerComponent from "./TestConfigurerComponent";

const container = {
    display: "flex"
};

const scaleDisplayContainer = {
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

    render() {
        const {selectedTest: selectedTestIndex} = this.props;
        return(
            <div style={container}>
                <div style={scaleDisplayContainer}>
                    <ScaleDisplayComponent scales={this.props.scales}/>
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
        createTest: () => {
            dispatch(createTest());
        },
        selectTest: (index) => {
            dispatch(selectTest(index));
        },
        setTestName: (testIndex, testName) => {
            dispatch(setTestName(testIndex, testName))
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(ExperimentalDesignContainer);