import React from "react";

export default class FileUpload extends React.Component {

	constructor(props) {
		super(props);
		this.onDataSubmit = this.onDataSubmit.bind(this);
	}

	render() {
		return(
      <div>
        <p className = "lead text-center">First of all, select a file with your collected data. The file should be in a spreadsheet format (like Excel), or CSV.</p>
        <p className = "text-center">First row will be treated as column names (headers).</p>
        <p className = "text-center">By the way, this file will NOT be uploaded anywhere, all processing is done locally!</p>
        <p className = "text-center">Please keep in mind, only the first worksheet will be processed!</p>
        <input className = "center-block" onChange={this.onDataSubmit} type="file" id ="file" ref="file"></input>
      </div>
		);
	}

	onDataSubmit() {
		const file = this.refs.file;
		this.props.onFileUpload(file.files[0], this.getExtension(file));
	}

	getExtension(file) {
		const path = file.value;
		const tokens = path.split(".");
		return tokens[tokens.length - 1];
	}

}