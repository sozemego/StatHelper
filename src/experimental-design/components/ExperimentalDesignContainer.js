import React from "react";
import {connect} from "react-redux";
import ScaleDisplayComponent from "./ScaleDisplayComponent";
import ExperimentalDesignConfigurationComponent from "./ExperimentalDesignConfigurationComponent";
import {createTest} from "../actions/experimental-design-actions";

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
                    <ExperimentalDesignConfigurationComponent createTest={this.props.createTest}/>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const {scales, experimentalDesign} = state;
    return {
        scales: scales.scales,
        tests: experimentalDesign.tests
    }
};

const dispatchToProps = (dispatch) => {
    return {
        createTest: () => {
            dispatch(createTest());
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(ExperimentalDesignContainer);