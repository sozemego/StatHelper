import React from "react";

const configurerContainer = {
    height: "100%",
    display: "flex",
    flexDirection: "column"
};

export default class ScaleConfigurerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {scale} = this.props;
        if (!scale) {
            return null;
        }
        return (
            <div style={configurerContainer}>
                {this.props.scale.name}
            </div>
        )
    }

}