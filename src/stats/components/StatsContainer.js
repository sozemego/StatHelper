import React from "react";
import {connect} from "react-redux";
import {Divider, FlatButton} from "material-ui";

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

class StatsContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <FlatButton
                    label="Run tests"
                    fullWidth={true}
                    style={{height: "65px"}}
                    labelStyle={{fontSize: "2rem"}}
                />
                <Divider />
                {this.props.tests.map(t => t.name)}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const {experimentalDesign} = state;
    return {
        tests: experimentalDesign.tests
    }
};

const dispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, dispatchToProps)(StatsContainer);