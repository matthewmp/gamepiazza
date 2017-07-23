import React from 'react';
import '../css/canvas-msg.css';
export default class PongMsg extends React.Component{
	

	render(){
		let msg = this.props.msg;
		return(
			<div className="canvas-msg">
				{msg}
			</div>
		)
	}
}