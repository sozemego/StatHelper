import React from "react";
import {Chip} from "material-ui";

const dataContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    width: "30%"
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
        if(!data) {
            return null;
        }
        return(
            <div style={dataContainerStyle}>
                {data.map((item, index) => {
                    return <Chip
                        style={elementStyle} key={index}
                        title={item}>
                        {this._truncateItemText(item, index)} [{index}]
                    </Chip>
                })}
            </div>
        )
    }

    _truncateItemText = (item, index) => {
        if(item.length < 16) {
            return item;
        }
        return item.substr(0, 16) + "...";
    };

}