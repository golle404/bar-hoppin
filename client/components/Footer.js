'use strict';

var React = require("react");
var IconButton = require('material-ui').IconButton;
var ActionHome = require('material-ui').ActionHome;
var SvgIcon = require('material-ui').SvgIcon;

var socialData = require('./svg/social-icons.js'); 

module.exports=React.createClass({
	displayName: 'Footer',
	_onClick: function(){

	},
	render: function(){
		return(
			<footer>
				<div>{ '\u00A9 2016 Goran Rakić' }</div>
				<IconButton 
					tooltip="Twitter"
					tooltipPosition="top-center"
					linkButton={true}
					href="https://twitter.com/gollactive" >
						<SvgIcon 
							viewBox='16 16 32 32'
							color={"#fff"}>
							<path d={socialData.twitter.icon} />
						</SvgIcon>
				</IconButton>
				<IconButton 
					tooltip="GitHub"
					tooltipPosition="top-center"
					linkButton={true}
					href="https://github.com/golle404" >
						<SvgIcon 
							viewBox='16 16 32 32'
							color={"#fff"}>
							<path d={socialData.github.icon} />
						</SvgIcon>
				</IconButton>
				<IconButton 
					tooltip="CodePen"
					tooltipPosition="top-center"
					linkButton={true}
					href="http://codepen.io/golle404/" >
						<SvgIcon 
							viewBox='16 16 32 32'
							color={"#fff"}>
							<path d={socialData.codepen.icon} />
						</SvgIcon>
				</IconButton>
			</footer> 
		);
	}
})
