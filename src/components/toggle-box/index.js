import React, { Component } from "react";
import {Button} from 'react-bootstrap';
//Fra: https://www.golangprograms.com/reactjs-show-hide-component-on-click.html

class ToggleBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

		if (opened){
			title ='Hide ' + this.props.title;
		}else{
			title ='Show ' + this.props.title;
		}

		return (
			<div className="box">
				<div className="boxTitle" onClick={this.toggleBox}>
					<Button>{title}</Button>
				</div>
				{opened && (					
					<div className="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;