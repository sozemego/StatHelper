import React from "react";

//CSS
import styles from "./inputpair.css";

export default class InputPair extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		const config = this.props.config;
	}

	render() {
		const answer = this.props.answer;
		const result = this.props.result;

		return(
			<form className = {styles.pair} onChange = {this.onChange}>
				<input type = "text" size={this.props.left} placeholder = {this.props.leftPlaceholder}
					ref="answer" value={answer}></input>
				->
				<input type = "text" size={this.props.right} placeholder = {this.props.rightPlaceholder}
					ref="result" value={result}></input>
			</form>
		);
	}

	onChange() {
		const answer = this.refs.answer.value;
		const result = this.refs.result.value;
		const pair = {answer: answer, result: result};
		this.setState(pair);

		this.props.pairChanged(this.props.index, pair);

	}


}
