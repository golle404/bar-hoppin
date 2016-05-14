'use strict';

var React = require("react");
var nanoajax = require("nanoajax");
var IconButton = require("material-ui").IconButton;
var Paper = require("material-ui").Paper;

import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
import AlertError from 'material-ui/lib/svg-icons/alert/error';
var red500 = require("material-ui").Styles.Colors.red500;
var blue500 = require("material-ui").Styles.Colors.blue500;
var orange500 = require("material-ui").Styles.Colors.orange500;


module.exports=React.createClass({
	displayName: 'BarItem',
	getInitialState: function(){
		return {goers: 0, rsvp: false};
	},
	componentWillMount: function(){
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
		}
	},
	onToggleRspv: function(){
		var apiUrl = "api/rspv/" + this.props.data.id;
		nanoajax.ajax({url: apiUrl, method:"POST"}, this.onBarData);
	},
	updateData: function(id){
		var apiUrl = "api/bar-data/" + id;
		nanoajax.ajax({url: apiUrl, method:"POST"}, this.onBarData);
	},
	render: function(){
		var data = this.props.data;
		var disabled = !this.props.user;
		var photo;
		var photoSrc = data.icon;
		if(data.photos){
			//photoSrc = "api/image/" + data.photos[0].photo_reference;
		}
		photo = <img src={photoSrc} />
		var icon, iconColor, tooltip;
		if(this.state.rsvp){
			icon = <ContentRemoveCircle color={red500}/>;
			tooltip = "Remove Yourself";
		}else {
			icon = <ContentAddCircle color={blue500}/>;
			tooltip = "Add Yourself"
		}
		if(disabled){
			icon = <AlertError color={orange500}/>
			tooltip = "Login to RSVP";
		}
		return(
			<li>
			<Paper style={{width: "100%"}} className="bar-item">
				<div className="bar-photo">
					{photo}
				</div>
				<div className="bar-details">
					<div className="bar-name">{data.name}</div>
					<div className="bar-address">{data.formatted_address}</div>
				</div>
				<div className="bar-hoppers">
					<IconButton
						onClick={this.onToggleRspv}
						disabled={disabled} 
						tooltip={tooltip}
						tooltipPosition="top-center">
						{icon}
					</IconButton>
					<div className="badge">{this.state.goers} people going</div>
				</div>
			</Paper>
			</li>
		);
	}
})