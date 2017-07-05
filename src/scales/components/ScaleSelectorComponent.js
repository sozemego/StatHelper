import React from "react";
import {Chip, FlatButton} from "material-ui";

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
            <div>
                <FlatButton
                    label="New scale"
                    secondary={true}
                    onTouchTap={() => this.props.createNewScale()}
                    style={{margin: "auto", width: "100%"}}
                />
                <div style={scaleListContainerStyle}>
                    {this.props.scaleNames.map((item, index) => {
                        return <Chip key={index}>
                            {item}
                        </Chip>
                    })}
                </div>
            </div>
        )
    }

}