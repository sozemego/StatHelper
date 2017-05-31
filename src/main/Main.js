import React from "react";
import {Tab, Tabs} from "material-ui";
import DataContainer from "../FileProcessing/component/DataContainer";
import ScalesContainer from "../Scales/components/ScalesContainer";

export default class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Tabs>
                <Tab label="Data">
                    <DataContainer />
                </Tab>
                <Tab label="Scales">
                    <ScalesContainer />
                </Tab>
            </Tabs>
        )
    }

}