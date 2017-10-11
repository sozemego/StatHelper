import React from 'react';

export default class FileUploadComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const spinner = this._getSpinner();
    return (
      <div>
        <input type="file" onChange={this._extractFile} accept=".xls,.xlsx,.csv"/>
        {spinner}
      </div>
    );
  }

  _getSpinner = () => {
    const {parsing} = this.props;
    if (parsing) {
      return <span>Parsing</span>;
    }
    return null;
  };

  _extractFile = (event) => {
    this.props.onFileUpload(event.target.files[0]);
  };

}