import React from "react";
import {connect} from "react-redux";
import ScaleDisplayComponent from "./ScaleDisplayComponent";
import ExperimentalDesignConfigurationComponent from "./ExperimentalDesignConfigurationComponent";

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
                    <ExperimentalDesignConfigurationComponent />
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

    }
};

export default connect(mapStateToProps, dispatchToProps)(ExperimentalDesignContainer);