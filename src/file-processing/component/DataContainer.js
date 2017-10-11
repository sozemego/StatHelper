import React from 'react';
import {connect} from 'react-redux';
import {parseFile} from '../actions/file-processing-actions';
import FileUploadComponent from './FileUploadComponent';
import DataDisplayComponent from './DataDisplayComponent';

export class DataContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onFileUpload,
      parsing,
      data
    } = this.props;
    return (
      <div>
        <FileUploadComponent onFileUpload={onFileUpload} parsing={parsing}/>
        <DataDisplayComponent data={data[0]}/>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const {fileProcessing} = state;
  return {
    data: fileProcessing.data,
    parsing: fileProcessing.parsing,
    error: fileProcessing.error
  };
};

const dispatchToProps = dispatch => {
  return {
    onFileUpload: file => {
      dispatch(parseFile(file));
    }
  };
};

export default connect(mapStateToProps, dispatchToProps)(DataContainer);