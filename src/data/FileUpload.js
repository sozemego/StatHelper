import React from "react";
import {connect} from "react-redux";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <input type="file" onChange={this._extractFile} accept=".xls,.xlsx,.csv"/>
        )
    }

    _extractFile = (event) => {
        this.props.onFileUpload(event.target.files[0]);
    };

}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
};

const dispatchToProps = (dispatch) => {
    return {
        onFileUpload: (file) => {
            dispatch({
                type: "DATA_UPLOAD",
                file
            })
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(FileUpload);