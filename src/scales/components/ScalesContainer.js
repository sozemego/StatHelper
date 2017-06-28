import React from "react";
import {connect} from "react-redux";
import DataDisplayComponent from "./DataDisplayComponent";

export class ScalesContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <DataDisplayComponent data={this.props.itemNames} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {fileProcessing, scales} = state;
    return {
        scales: scales.scales,
        itemNames: fileProcessing.data[0]
    }
};

const dispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);