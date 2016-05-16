'use strict';

var React = require("react");
var nanoajax = require("nanoajax");
var IconButton = require("material-ui").IconButton;
var RaisedButton = require("material-ui").RaisedButton;
var Badge = require("material-ui").Badge;
var Paper = require("material-ui").Paper;

var ContentAddCircle = require('material-ui/lib/svg-icons/content/add-circle');
var ContentRemoveCircle = require('material-ui/lib/svg-icons/content/remove-circle');
var AlertError = require('material-ui/lib/svg-icons/alert/error');
var SocialGroup = require('material-ui/lib/svg-icons/social/group');

var cid = "?ref=GB2O1V4V0TJB22TA4DCOSNOIOY2X5OYDKVNWZZLOT01W32D2"
module.exports=React.createClass({
	displayName: 'BarItem',
	getInitialState: function(){
		return {goers: 0, rsvp: false};
	},
	componentWillMount: function(){
		this.btnStyle = {fontSize: ".7em"}
		this.shouldDispatch = false;
		this.updateData(this.props.data.id);
	},
	componentWillReceiveProps : function(nextProps){
		if(this.props.data.id != nextProps.data.id){
			this.updateData(nextProps.data.id);	
		}
	},
	onBarData: function(code, rsp){
		if(code === 200){
			var r = JSON.parse(rsp)
			this.setState({goers: r.goers, rsvp: r.rsvp});
			if(this.shouldDispatch){
				this.props.dispatch(this.props.data.name, r.rsvp);
				this.shouldDispatch = false;
			}
		}
	},
	onToggleRspv: function(){
		if(this.props.user){
			var apiUrl = "api/rspv/" + this.props.data.id;
			this.shouldDispatch = true;
			nanoajax.ajax({url: apiUrl, method:"POST"}, this.onBarData);
		}else{
			return;
		}
	},
	updateData: function(id){
		var apiUrl = "api/bar-data/" + id;
		nanoajax.ajax({url: apiUrl, method:"POST"}, this.onBarData);
	},
	render: function(){
		var data = this.props.data;
		var disabled = !this.props.user;
		var photo;
		//var photoSrc = data.icon;
		var catIcon = data.categories[0].icon
		var photoSrc = catIcon.prefix.replace("ss3.4sqi.net","foursquare.com") + "64" + catIcon.suffix;
		if(data.photos){
			//photoSrc = "api/image/" + data.photos[0].photo_reference;
		}
		photo = <img src={photoSrc} />
		var icon, btnColor, tooltip;
		if(this.state.rsvp){
			icon = <ContentRemoveCircle />;
			btnColor = "#FF4081"
			tooltip = "Remove Yourself";
		}else {
			btnColor = "#00BCD4"
			icon = <ContentAddCircle />;
			tooltip = "Add Yourself"
		}
		if(disabled){
			btnColor = "#00BCD4"
			icon = <AlertError />
			tooltip = "Login to RSVP";
		}
		return(
			<li>
			<Paper style={{width: "100%"}} className="bar-item">
				<div className="bar-photo" style={{backgroundColor:btnColor}}>
					{photo}
				</div>
				<div className="bar-details">
					<div className="bar-name"><a target="_blank" href={"http://foursquare.com/v/" + data.id + cid}>{data.name}</a></div>
					<div className="bar-address">{data.location.formattedAddress.join(" - ")}</div>
				</div>
				<div className="bar-hoppers">
					<RaisedButton
						primary={true}
						label={tooltip}
						onClick={this.onToggleRspv}
						backgroundColor={btnColor}
						disabled={disabled}
						labelStyle={this.btnStyle} 
						icon={icon} />
					<Badge
						style={{padding: 0}}
						badgeContent={this.state.goers}
						secondary={true}
						badgeStyle={{top: 4, right: -22, fontSize: 12, width: 20, height: 20, backgroundColor:btnColor}}>
							<SocialGroup 
								style={{width: "32px", height: "32px"}} />
				    </Badge>					
				</div>
			</Paper>
			</li>
		);
	}
})

/*<Badge
						style={{padding: 0}}
						badgeContent={this.state.goers}
						secondary={true}
						badgeStyle={{top: -8, right: -4, fontSize: 12, width: 20, height: 20}}>
							<IconButton 
								tooltipPosition="top-center"
								tooltip={this.state.goers + " people going"}
								style={{padding: 0, height: 24, zIndex: 1000}}>
								<SocialGroup />
							</IconButton>
				    </Badge>					
				    */
/*
					<IconButton
						onClick={this.onToggleRspv}
						disabled={false} 
						tooltip={tooltip}
						tooltipPosition="top-center">
						{icon}
					</IconButton>
*/
