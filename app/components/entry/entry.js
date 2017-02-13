import React from "react";

export default class Entry extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
      <a href = "/app">
        <img src = "img/entry.png" className = "center-block img-responsive"></img>
      </a>
		);
	}

}
