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

		this.state = {
			design: new ExperimentalDesign(),
			selectedItems: []
		};
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
				<DataDisplay data = {data} clickCallback = {this.clickCallback} ref="datadisplay" selectedItems = {this.state.selectedItems} />
				<Separator />
				<ScaleCreator data = {data} getScales = {this.state.design.getScales} onAddScale = {this.onAddScale} selectedItems = {this.state.selectedItems}/>
				<ScaleConfigurer getScales = {this.state.design.getScales}/>
				<Separator />
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

	onAddScale(scale, parentScale) {
		this.state.design.addScale(scale, parentScale);
		this.setState({selectedItems: []});
		this.refs.datadisplay.forceUpdate();
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

	hideInfobar() {
		this.setState({message: null});
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
