import React from "react";
import {Tab, Tabs} from "material-ui";
import FileUpload from "../FileProcessing/component/FileUploadComponent";

export default class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Tabs>
                <Tab label="Data">
                    <FileUpload />
                </Tab>
            </Tabs>
        )
    }

}