import React, {Component} from "react";

export default class Logo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img src = {this.props.logo} className = "center-block img-responsive"></img>
    )
  }
}
