'use strict';

var React = require("react");

var AppBar = require("material-ui").AppBar; 

var FlatButton = require("material-ui").FlatButton; 
var IconMenu = require("material-ui").IconMenu; 
var MenuItem = require("material-ui").MenuItem; 
var IconButton = require("material-ui").IconButton; 
var NavigationMenu = require('material-ui/lib/svg-icons/navigation/menu');

var SvgIcon = require("material-ui").SvgIcon;
var socialData = require('./svg/social-icons.js'); 

module.exports=React.createClass({
	displayName: 'Header',
	render: function(){
		var btnLabel = "Login";
		var btnHref = "/auth/twitter";
		var title = "Bar Hoppin'";
		if(this.props.user){
			btnLabel = "Logout";
			btnHref = "/logout"
			title += " - welcome " + this.props.user.name
		}
		return(
			<header>
 				<AppBar
					title={title}
					iconElementRight={
							<FlatButton 
								label={btnLabel}
								labelPosition="before"
								linkButton={true}
								href={btnHref} >
								<SvgIcon
                                	viewBox='16 16 32 32'
                                	width="24"
                                	height="24"
                                	style={{verticalAlign: "middle", marginRight: "10px"}}
                                	color={"#fff"}>
                                		<path d={socialData.twitter.icon} />
                            	</SvgIcon>
                        	</FlatButton>
					}
					iconElementLeft={
						<IconMenu
							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
							targetOrigin={{horizontal: 'left', vertical: 'top'}}
							iconButtonElement={<IconButton><NavigationMenu /></IconButton>} >
							<MenuItem primaryText="Refresh" />
						      <MenuItem primaryText="Send feedback" />
						      <MenuItem primaryText="Settings" />
						      <MenuItem primaryText="Help" />
						      <MenuItem primaryText="Sign out" />
						</IconMenu>
					} />
 			</header>
		);
	}
})

/*
iconElementLeft={
						<IconMenu
							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
							targetOrigin={{horizontal: 'left', vertical: 'top'}}
							iconButtonElement={<IconButton><NavigationMenu /></IconButton>} >
							<MenuItem primaryText="Refresh" />
						      <MenuItem primaryText="Send feedback" />
						      <MenuItem primaryText="Settings" />
						      <MenuItem primaryText="Help" />
						      <MenuItem primaryText="Sign out" />
						</IconMenu>
					} 
					*/