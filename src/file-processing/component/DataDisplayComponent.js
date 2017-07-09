import React from "react";
import {Chip} from "material-ui";

const dataContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    justifyContent: "center"
};

const elementStyle = {
    padding: "4px",
    margin: "2px",
    fontSize: "1.1em"
};

export default class DataDisplayComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {data} = this.props;
        return(
            <div style={dataContainerStyle}>
                {data.map((item, index) => {
                    return <Chip style={elementStyle} key={index}>{item}</Chip>
                })}
            </div>
        )
    }

}