'use strict';

var nanoajax = require("nanoajax");

var React = require("react");
var Content = require("./Content.js");
var Footer = require("./Footer.js");
var Header = require("./Header.js");

module.exports=React.createClass({
	displayName: 'Main',
	getInitialState: function(){
		return {user: null};
	},
	componentDidMount: function(){
		nanoajax.ajax({url: "api/user", method:"POST"}, this.onUserData);
	},
	onUserData: function(code, rsp){
		if(code === 200){
			if(rsp){
				this.setState({user: JSON.parse(rsp)})
			}
		}
	},
	render: function(){
		return(
			<div className="main">
				<Header user={this.state.user}/>
				<Content 
					user={this.state.user} 
					search={this.props.search} />
				<Footer/>
			</div>
		);
	}
})
