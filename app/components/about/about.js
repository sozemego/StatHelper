import React from "react";

import styles from "./about.css";

export default class About extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className = "container_fluid">
        <div className = {styles.about_container + " " + styles.about_text}>
          <p className = {"lead text-center " + styles.top_element}>Are you a psychology student who has a little trouble handling their statistics & methodology section of your paper?</p>
          <p className = "lead text-center">Tired of deciding which statistical tests to choose?</p>
          <p className = "lead text-center">Want some pretty charts sprinkled throughout your paper?</p>
        </div>
      </div>
    )
  }

}
