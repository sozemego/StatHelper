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
                <DataDisplayComponent data={this.props.data[0]} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {fileProcessing, scales} = state;
    return {
        scales: scales.scales,
        data: fileProcessing.data
    }
};

const dispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);