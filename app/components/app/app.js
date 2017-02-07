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

//UTILS
import FileParser from "../../fileparser/fileparser";
import ExperimentalDesign from "../../experimentaldesign/experimentaldesign";


export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.onFileUpload = this.onFileUpload.bind(this);
		this.hideInfobar = this.hideInfobar.bind(this);
		this.clickCallback = this.clickCallback.bind(this);
		this.onAddScale = this.onAddScale.bind(this);
		this.displayErrorMessage = this.displayErrorMessage.bind(this);

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
				<DataDisplay data = {data} clickCallback = {this.clickCallback} selectedItems = {this.state.selectedItems} />
				<Separator />
				<ScaleCreator data = {data} getScales = {this.state.design.getScales} onAddScale = {this.onAddScale} selectedItems = {this.state.selectedItems}/>
				<ScaleConfigurer getScales = {this.state.design.getScales} getScale = {this.state.design.getScale}/>
				<Separator />
				<Descriptives set = {this.state.design.setDescriptives} get = {this.state.design.getDescriptives}/>
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

	displayErrorMessage(message) {
		this.setState({
			errorMessage: {
				message: message,
				time: Date.now()
			}
		});
	}

	onFileUpload(file, extension) {
		FileParser.parseFile(file, extension, this.onParse.bind(this));
	}

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

	clickCallback(cellIndex) {
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
