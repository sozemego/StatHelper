import React from "react";

//CSS
import styles from "./encodingpair.css";

export default class EncodingPair extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);

		this.state = {
			answer: props.answer,
			result: props.result
		};
	}

	render() {
		const answer = this.state.answer;
		const result = this.state.result;

		return(
			<form className = {styles.pair} onChange = {this.onChange}>
				<input type = "text" size="30" ref="answer" value={answer}></input>
				->
				<input type = "text" size="6" ref="result" value={result}></input>
			</form>
		);
	}

	onChange() {
		const answer = this.refs.answer.value;
		const result = this.refs.result.value;
		this.setState({answer: answer, result: result});

		if(!this.props.pairFilled) {
			return;
		}

		if(answer.length > 0 && result.length > 0) {
			this.props.pairFilled(answer, result);
		}

	}


}
