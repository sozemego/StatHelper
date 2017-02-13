import React from "react";

/**
	Component for uploading the file. It basically takes the file
	from the input element and calls the callback.
*/
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
        <input className = "center-block" onChange={this.onDataSubmit} type="file" id ="file"></input>
      </div>
		);
	}

	onDataSubmit(event) {
		const file = event.target.files[0];
		this.props.onFileUpload(file, this.getExtension(file));
	}

	getExtension(file) {
		const name = file.name;
		const tokens = name.split(".");
		return tokens[tokens.length - 1];
	}

}
