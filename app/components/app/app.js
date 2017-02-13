/*jshint esversion: 6 */
import React from "react";

// COMPONENTS
import Infobar from "../../components/infobar/infobar";
import Header from "../../components/header/header";
import Separator from "../../components/separator/separator";
import FileUpload from "../../components/fileupload/fileupload";
import DataDisplay from "../../components/datadisplay/datadisplay";
import ScaleCreator from "../../components/scalecreator/scalecreator";
import ScaleConfigurer from "../../components/scaleconfigurer/scaleconfigurer";
import Descriptives from "../../components/descriptives/descriptives";
import IndependentVariables from "../../components/independentvariables/independentvariables";

//UTILS
import FileParser from "../../fileparser/fileparser";
import ExperimentalDesign from "../../experimentaldesign/experimentaldesign";

/**
	A component represents both the structure and the flow of
	user experience. All neccesary data is contained in this
	component's state.
*/
export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.onFileUpload = this.onFileUpload.bind(this);
		this.hideInfobar = this.hideInfobar.bind(this);
		this.onItemClick = this.onItemClick.bind(this);
		this.onAddScale = this.onAddScale.bind(this);
		this.displayErrorMessage = this.displayErrorMessage.bind(this);
		this.onParse = this.onParse.bind(this);

		this.state = {
			design: new ExperimentalDesign(),
			selectedItems: [],
			errorMessage: {
				message: null,
				time: null
			}
		};
	}

	render() {
		const data = this.state.data;
		return(
      <div onClick = {this.hideInfobar}>
				<Infobar errorMessage = {this.state.errorMessage}/>
        <Header />
				<Separator />
        <FileUpload onFileUpload = {this.onFileUpload}/>
				<Separator />
				<DataDisplay data = {data} clickCallback = {this.onItemClick} selectedItems = {this.state.selectedItems} />
				<Separator />
				<ScaleCreator data = {data} scales = {this.state.design.scales} onAddScale = {this.onAddScale} selectedItems = {this.state.selectedItems}/>
				<ScaleConfigurer scales = {this.state.design.scales}/>
				<Separator />
				<Descriptives descriptives = {this.state.design.descriptives}/>
				<Separator />
				<IndependentVariables groups = {this.state.design.groups}/>
        <p>Here display buttons for each scale</p>
				<p>When clicked, a scale config will appear, where all configuration happens</p>
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

	onAddScale(scale) {
		const success = this.state.design.addScale(scale);
		if(success === false) {
			this.displayErrorMessage("Scale with this name already exists!");
		}
		this.setState({selectedItems: []});
	}

	/**
		Sets state to reflect that an error message was just posted.
	*/
	displayErrorMessage(message) {
		this.setState({
			errorMessage: {
				message: message,
				time: Date.now()
			}
		});
	}

	/**
		Callback for uploading a file (.xlsx, .csv).
		Parses the file and calls the onParse callback.
	*/
	onFileUpload(file, extension) {
		new FileParser().parseFile(file, extension, this.onParse);
	}

	/**
		Callback for parsing the file. If unsuccessful, displays an
		error message. Otherwise, adds parsed data to the state.
	*/
	onParse(result) {
		if(result.error) {
			this.displayErrorMessage(result.error);
		} else {
			this.setState({data: result});
		}
	}

	/**
		Hides the infobar, but only if more than 2 seconds passed since
		the message was set.
	*/
	hideInfobar() {
		if(this.state.errorMessage.time === null) {
			return;
		}

		const timeDifference = Date.now() - this.state.errorMessage.time;
		if(timeDifference > 2000) {
			this.setState({errorMessage: {
				message: null,
				time: null
			}});
		}
	}

	/**
		Called when users click items (in the DisplayGrid).
		It adds the cellIndex to the selectedItems if the index was
		not there previously, otherwise removes it (so it toggles the cell
		selection).
	*/
	onItemClick(cellIndex) {
		const selectedItems = this.state.selectedItems;
		const cells = selectedItems.filter(function(item) {
			return item === cellIndex;
		});

		if(cells.length === 0) {
			selectedItems.push(cellIndex);
		} else {
			for(var i = 0; i < selectedItems.length; i++) {
				if(selectedItems[i] === cellIndex) {
					selectedItems.splice(i, 1);
				}
			}
		}

		this.setState({selectedItems: selectedItems});
	}
}
