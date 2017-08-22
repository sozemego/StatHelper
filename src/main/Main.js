import React from "react";
import {Tab, Tabs} from "material-ui";
import DataContainer from "../file-processing/component/DataContainer";
import ScalesContainer from "../scales/components/ScalesContainer";
import ExperimentalDesignContainer from "../experimental-design/components/ExperimentalDesignContainer";
import StatsContainer from "../stats/components/StatsContainer";

export default class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Tabs value={4}>
                <Tab label="Data" value={1}>
                    <DataContainer />
                </Tab>
                <Tab label="Scales" value={2}>
                    <ScalesContainer />
                </Tab>
                <Tab label="Experimental design" value={3}>
                    <ExperimentalDesignContainer />
                </Tab>
                <Tab label="Stats" value={4}>
                    <StatsContainer />
                </Tab>
            </Tabs>
        )
    }

}