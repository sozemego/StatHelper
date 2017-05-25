import React from "react";
import {connect} from "react-redux";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <input type="file"/>
        )
    }

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