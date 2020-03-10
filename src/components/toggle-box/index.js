import React, { Component } from "react";
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
			title ='Hide request history';
		}else{
			title ='Show request history';
		}

		return (
			<div className="box">
				<div className="boxTitle" onClick={this.toggleBox}>
					<button>{title}</button>
				</div>
				{opened && (					
					<div class="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;