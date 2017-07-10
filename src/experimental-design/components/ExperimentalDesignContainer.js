import React from "react";
import {connect} from "react-redux";
import ScaleDisplayComponent from "./ScaleDisplayComponent";
import TestSelectorComponent from "./TestSelectorComponent";
import {createTest, selectTest} from "../actions/experimental-design-actions";
import TestCreatorComponent from "./TestCreatorComponent";

const container = {
    display: "flex"
};

const scaleDisplayContainer = {
    width: "30%"
};

const designContainer = {
    width: "70%"
};

class ExperimentalDesignContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={container}>
                <div style={scaleDisplayContainer}>
                    <ScaleDisplayComponent scales={this.props.scales}/>
                </div>
                <div style={designContainer}>
                    <TestCreatorComponent createTest={this.props.createTest} />
                    <TestSelectorComponent
                        selectTest={this.props.selectTest}
                        testNames={this.props.tests.map(test => test.name)}
                        selectedTestIndex={this.props.selectedTest}
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
    }
};

export default connect(mapStateToProps, dispatchToProps)(ExperimentalDesignContainer);