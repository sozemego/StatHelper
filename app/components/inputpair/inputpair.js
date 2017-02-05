import React from "react";

//CSS
import styles from "./inputpair.css";

export default class InputPair extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		const config = this.props.config;
		this.state = {
			answer: props.answer,
			result: props.result,
			left: config.left ? config.left : 30,
			right: config.right ? config.right : 6,
			leftPlaceholder: config.leftPlaceholder ? config.leftPlaceholder: "",
			rightPlaceholder: config.rightPlaceholder ? config.rightPlaceholder: ""
		};
	}

	render() {
		const answer = this.state.answer;
		const result = this.state.result;

		return(
			<form className = {styles.pair} onChange = {this.onChange}>
				<input type = "text" size={this.state.left} placeholder = {this.state.leftPlaceholder}
					ref="answer" value={answer}></input>
				->
				<input type = "text" size={this.state.right} placeholder = {this.state.rightPlaceholder}
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
