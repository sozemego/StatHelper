import React from "react";

import Logo from "../../components/logo/logo";
//import styles from "./header.css";

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className = "container_fluid">
        <div className = "row">
          <Logo logo = "img/logo.png"/>
        </div>
      </div>
    )
  }

}
