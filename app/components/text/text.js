const React = require('react');

export default class Text extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li onClick = {this.onClick.bind(this)}>{this.props.text}</li>
    )
  }

  onClick() {
    this.props.itemAdd(this.props.text);
  }

}
