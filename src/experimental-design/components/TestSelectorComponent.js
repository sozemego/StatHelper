import React from "react";
import {Chip, RaisedButton} from "material-ui";

const button = {
    margin: "auto",
    width: "100%"
};

const testListContainer = {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "6px"
};

const selectedTest = {
    backgroundColor: "orange"
};

export default class TestSelectorComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    _isTestSelected = (index) => {
        return this.props.selectedTestIndex === index;
    };

    render() {
        return(
            <div>
                <div style={testListContainer}>
                    {this.props.testNames.map((test, index) => {
                        return <Chip
                            onTouchTap={() => this.props.selectTest(index)}
                            key={index}
                            style={this._isTestSelected(index) ? selectedTest : {}}
                        >
                            {test}
                        </Chip>
                    })}
                </div>
            </div>
        )
    }

}