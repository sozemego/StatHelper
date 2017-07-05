import React from "react";

export default class ScaleConfigurerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {scale} = this.props;
        if(!scale) {
            return null;
        }
        return(
            <div>
                {this.props.scale.name}
            </div>
        )
    }

}