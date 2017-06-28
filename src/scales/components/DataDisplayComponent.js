import React from "react";
import {Chip, FlatButton, TextField} from "material-ui";

const dataContainerStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "flex-start",
    width: "30%"
};

const elementStyle = {
    padding: "4px",
    margin: "2px",
    textAlign: "center",
    fontSize: "0.75em"
};

export default class DataDisplayComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {data} = this.props;
        if(!data) {
            return null;
        }
        return(
            <div style={dataContainerStyle}>
                {data.map((item, index) => {
                    return <div
                        style={elementStyle}
                        key={index}>
                        {item}
                    </div>
                })}
            </div>
        )
    }

    _truncateItemText = (item, index) => {
        return item;
        if(item.length < 16) {
            return item;
        }
        return item.substr(0, 16) + "...";
    };

}