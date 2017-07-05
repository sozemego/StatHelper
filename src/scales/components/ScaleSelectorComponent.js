import React from "react";
import {Chip, FlatButton} from "material-ui";

const selectorContainerStyle = {

};

const scaleListContainerStyle = {
    display: "flex",
    flexWrap: "wrap"
};

export default class ScaleSelectorComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={selectorContainerStyle}>
                <FlatButton
                    label="New scale"
                    onTouchTap={() => this.props.createNewScale()}
                    style={{margin: "auto", width: "100%"}}
                />
                <div style={scaleListContainerStyle}>
                    {this.props.scaleNames.map((item, index) => {
                        return <Chip>
                            {item}
                        </Chip>
                    })}
                </div>
            </div>
        )
    }

}