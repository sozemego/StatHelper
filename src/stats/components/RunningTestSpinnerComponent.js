import React from 'react';
import {Divider} from 'material-ui';

export class RunningTestSpinnerComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2 style={{textAlign: 'center', width: '100%'}}>{this.props.name}</h2>
				<div style={{
					width: '100px',
					height: '100px',
					margin: 'auto',
					transform: 'scale(0.25) translate(-50%, -100%)'
				}}>
					<div className="lds-microsoft" style={{width: '100%', height: '100%'}}>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<Divider/>
			</div>
		);
	}

}