import React from "react";
import {connect} from "react-redux";
import {parseFile} from "../actions/actions";

class FileUploadComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const spinner = this._getSpinner();
        return(
            <div>
                <input type="file" onChange={this._extractFile} accept=".xls,.xlsx,.csv"/>
                {spinner}
            </div>
        )
    }

    _getSpinner = () => {
        const {parsing} = this.props;
        if(parsing) {
            return <span>Parsing</span>;
        }
        return null;
    };

    _extractFile = (event) => {
        this.props.onFileUpload(event.target.files[0]);
    };

}

const mapStateToProps = (state) => {
    const {fileProcessing} = state;
    return {
        data: fileProcessing.data,
        parsing: fileProcessing.parsing,
        error: fileProcessing.error
    }
};

const dispatchToProps = (dispatch) => {
    return {
        onFileUpload: (file) => {
            dispatch(parseFile(file));
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(FileUploadComponent);