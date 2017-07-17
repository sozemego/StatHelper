import React from "react";
import {TextField} from "material-ui";

const configurerContainer = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "10px 25px 0px 25px"
};

const field = {
    display: "flex",
    justifyContent: "flex-start"
};

const fieldName = {
    marginRight: "10px"
};

export default class TestConfigurerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    _onTestNameChange = (event, newValue) => {
        this.props.setTestName(newValue);
    };

    render() {
        console.log(this.props.selectedTest);
        if(!this.props.selectedTest) {
            return null;
        }
        const test = this.props.selectedTest;
        return(
            <div style={configurerContainer}>
                <div style={field}>
                    <p style={fieldName}>Scale name</p>
                    <TextField
                        hintText="Test name"
                        fullWidth={false}
                        value={test.name}
                        underlineShow={false}
                        onChange={this._onTestNameChange}/>
                </div>
            </div>
        )
    }
}