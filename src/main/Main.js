import React from "react";
import {connect} from "react-redux";
import Counter from "./click-dumb";

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                this is the main app!
                <Counter clicks={this.props.clicks} onCounterClick={this.props.onCounterClick}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        clicks: state.clicks
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCounterClick: (value) => {
             dispatch({type: "CLICKED", clicks: ++value })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);