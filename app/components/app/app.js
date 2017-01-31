/*jshint esversion: 6 */
import React from "react";

// COMPONENTS
import Header from "../../components/header/header";
import Separator from "../../components/separator/separator";
import FileUpload from "../../components/fileupload/fileupload";
import DataDisplay from "../../components/datadisplay/datadisplay";
import Infobar from "../../components/infobar/infobar";

//UTILS
import FileParser from "../../fileparser/fileparser";


export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.onFileUpload = this.onFileUpload.bind(this);
		this.hideInfobar = this.hideInfobar.bind(this);
		this.state = {};
	}

	componentWillMount() {

	}

	hideInfobar() {
		this.setState({message: null});
	}

	render() {
		const data = this.state.data;
		return(
      <div onClick = {this.hideInfobar}>
				<Infobar message = {this.state.message}/>
        <Header />
				<Separator />
        <FileUpload onFileUpload = {this.onFileUpload}/>
				<Separator />
				<DataDisplay data = {data}/>
				<Separator />
        <p>analyze file and display columns along with names. let user define which column belongs where</p>
        <p>also here, user will be able to define scales</p>
        <p>----------</p>
        <p>based on what user picked, let him choose statistical tests</p>
        <p>let them choose as many as they want</p>
        <p>let user choose charts to add in the text</p>
				<p>display all statistics without a document</p>
				<p>only after statistics are computed, attempt to create a document</p>
				<p>this will give me a working feature before a document template is ready</p>
        <p>output document</p>
        <p>end</p>
      </div>
		);
	}

	onFileUpload(file, extension) {
		FileParser.parseFile(file, extension, this.onParse.bind(this));
	}

	onParse(result) {
		if(result.error) {
			this.setState({message: result.error});
		} else {
			this.setState({data: result});
		}
	}

}
