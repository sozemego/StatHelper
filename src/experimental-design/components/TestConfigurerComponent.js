import React from "react";

export default class TestConfigurerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.selectedTest);
        if(!this.props.selectedTest) {
            return null;
        }
        return(
            <div>
                {this.props.selectedTest.name}
            </div>
        )
    }
}