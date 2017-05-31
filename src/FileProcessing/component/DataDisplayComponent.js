import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";

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
    border: "1px solid gray",
    fontSize: "1.1em"
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
                    return <span style={elementStyle} key={index}>{item} [{index += 1}]</span>
                })}
            </div>
        )
    }

}