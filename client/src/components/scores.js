import React from 'react';

export default class Score extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(	
			<tr>
				<td>{this.props.data.date}</td>
				<td>{this.props.data.game}</td>
				<td>{this.props.data.score}</td>
			</tr>
		)
	}
}