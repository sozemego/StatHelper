import React from 'react';
import {SpinnerComponent} from '../../common/component/SpinnerComponent';

export default class FileUploadComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _getSpinner = () => {
    return this.props.loading ? <SpinnerComponent/> : null;
  };

  _extractFile = event => {
    this.props.onFileUpload(event.target.files[0]);
  };

  render() {
    const {
      _extractFile,
      _getSpinner
    } = this;

    return (
      <div>
        <input type="file" onChange={_extractFile} accept=".xls,.xlsx,.csv"/>
        {_getSpinner()}
      </div>
    );
  }

}