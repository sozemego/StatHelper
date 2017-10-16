import React from 'react';
import {connect} from 'react-redux';
import {parseFile} from '../operations';
import FileUploadComponent from '../components/FileUploadComponent';
import DataDisplayComponent from '../components/DataDisplayComponent';
import {
  dataLoaderRootSelector,
  getError,
  getItemNames,
  isLoading
} from '../selectors';

export class DataContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onFileUpload,
      loading,
      itemNames
    } = this.props;

    return (
      <div>
        <FileUploadComponent onFileUpload={onFileUpload} loading={loading}/>
        <DataDisplayComponent itemNames={itemNames}/>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const dataLoader = dataLoaderRootSelector(state);
  return {
    itemNames: getItemNames(dataLoader),
    loading: isLoading(dataLoader),
    error: getError(dataLoader)
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