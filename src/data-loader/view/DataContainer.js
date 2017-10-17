import React from 'react';
import {connect} from 'react-redux';
import operations from '../operations';
import FileUploadComponent from './FileUploadComponent';
import DataDisplayComponent from './DataDisplayComponent';
import selectors from '../selectors';

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
  const dataLoader = selectors.dataLoaderRootSelector(state);
  return {
    itemNames: selectors.getItemNames(dataLoader),
    loading: selectors.isLoading(dataLoader),
    error: selectors.getError(dataLoader)
  };
};

const dispatchToProps = dispatch => {
  return {
    onFileUpload: file => {
      dispatch(operations.loadFile(file));
    }
  };
};

export default connect(mapStateToProps, dispatchToProps)(DataContainer);