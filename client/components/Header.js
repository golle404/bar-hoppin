'use strict';

var React = require("react");

var AppBar = require("material-ui").AppBar; 
var FlatButton = require("material-ui").FlatButton; 

module.exports=React.createClass({
	displayName: 'Header',
	render: function(){
		var btnLabel = "Login";
		var btnHref = "/auth/twitter";
		if(this.props.user){
			btnLabel = this.props.user.name;
			btnHref = "/auth/logout"
		}
		return(
			<header>
				<AppBar
					title="Bar Hoppin'" 
					iconElementRight={
						<FlatButton 
							label={btnLabel}
							linkButton={true}
							href={btnHref} />
					}/>
			</header>
		);
	}
})