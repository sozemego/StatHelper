import React from "react";

//COMPONENTS
import EncodingPair from "./encodingpair/encodingpair";

export default class EncodingCreator extends React.Component {

	constructor(props) {
		super(props);
		this.getFilledBoxes = this.getFilledBoxes.bind(this);
		this.pairFilled = this.pairFilled.bind(this);
		this.state = {
			filledPairs : []
		};
	}

	render() {

		const boxes = this.getFilledBoxes();

		return(
			<div>

				<p className = "text-center">Define your encodings here. What are encodings?
					Simply put, they map participants answers to scores. For most scales, the answer is the score.
					It is possible however, that you have answers like "most likely" in your scales. You can map those
					answers to nice numerical values.
				</p>

				<div>
					<span>Name:</span><input type="text" ref="encodingname" placeholder="Encoding name"></input>
				</div>
				{boxes}

			</div>
		);
	}

	getFilledBoxes() {
		const filledPairs = this.state.filledPairs;

		const boxes = filledPairs.map(function(item, index) {
			return(
				<EncodingPair answer = {item.answer} result = {item.result} />
			);
		});

		const lastBox = <EncodingPair answer = {""} result = {""} pairFilled = {this.pairFilled}/>;
		boxes.push(lastBox);

		return boxes;
	}

	pairFilled(answer, result) {
		const filledPairs = this.state.filledPairs;
		filledPairs.push({answer: answer, result: result});
		this.setState(filledPairs);
	}



}
