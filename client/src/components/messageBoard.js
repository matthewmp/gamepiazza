import React from 'react';

export default function MessageBoard(props){
	return(
		<div className="message-board-container">
			<form id="mb-form">
				<input type="text" placeholder="Type Message" name="message-inp" id="message-inp" />
				<button type="button" onClick={props.postMsg}>Post Message</button>
			</form>
			<div className="group-messages">

			</div>
		</div>
	)
}