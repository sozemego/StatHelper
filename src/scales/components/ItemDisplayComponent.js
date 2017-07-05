import React from "react";

const dataContainerStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "flex-start"
};

const itemStyle = {
    padding: "4px",
    margin: "2px",
    textAlign: "center",
    fontSize: "0.85em",
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    khtmlUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    cursor: "pointer"
};

const selectedItemStyle = Object.assign({}, itemStyle, {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
});

export default class ItemDisplayComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {data} = this.props;
        if(!data) {
            return null;
        }
        return(
            <div style={dataContainerStyle}>
                {data.map((item, index) => {
                    return <div
                        style={this._getItemStyle(index)}
                        onMouseDown={() => {
                            this.props.startSelectingItems();
                            this.props.toggleItem(index);
                        }}
                        onMouseEnter={() => this.props.toggleItem(index)}
                        key={index}
                    >
                        {item}
                    </div>
                })}
            </div>
        )
    }

    _getItemStyle = (itemIndex) => {
        const {selectedItems} = this.props;

        const index = selectedItems.findIndex((item) => {
            return item === itemIndex;
        });

        if(index === -1) {
            return itemStyle;
        } else {
            return selectedItemStyle;
        }
    };

}