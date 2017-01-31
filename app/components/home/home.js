import React from "react";
import { Link } from "react-router";

import Header from "../../components/header/header";
import Logo from "../../components/logo/logo";
import About from "../../components/about/about";
import Entry from "../../components/entry/entry";

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Header />
        <About />
        <Entry />
      </div>
    )
  }
}
