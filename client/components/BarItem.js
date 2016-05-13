'use strict';

var React = require("react");
var nanoajax = require("nanoajax");
//var AddIcon = require("react-icons/lib/md/control-point");
//var RemoveIcon = require("react-icons/lib/md/remove-circle-outline");

var IconButton = require("material-ui").IconButton;
import ImageControlPoint from 'material-ui/lib/svg-icons/image/control-point'
import ActionHighlightOff from 'material-ui/lib/svg-icons/action/highlight-off'

module.exports=React.createClass({
	displayName: 'BarItem',
	getInitialState: function(){
		return {goers: 0, rsvp: false};
	},
	componentDidMount: function(){
		var apiUrl = "api/bar-data/" + this.props.data.id;
		nanoajax.ajax({url: apiUrl, method:"POST"}, this.onBarData);
	},
	onBarData: function(code, rsp){
		if(code === 200){
			console.log(rsp)
			var r = JSON.parse(rsp)
			this.setState({goers: r.goers, rsvp: r.rsvp});
		}
	},
	onToggleRspv: function(){
		var apiUrl = "api/rspv/" + this.props.data.id;
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
		var icon = <ImageControlPoint/>
		var tooltip;
		if(this.state.rsvp){
			icon = <ActionHighlightOff/>;
			tooltip = "Remove Yourself";
		}else {
			tooltip = "Add Yourself"
		}
		if(disabled){
			tooltip = "Login to RSVP";
		}
		return(
			<li>
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
						tooltip={tooltip}>
						{icon}
					</IconButton>
					<div className="badge">{this.state.goers} people going</div>
				</div>
			</li>
		);
	}
})

/*
var data = this.props.data;
		var disabled = !this.props.isUser;
		var photo;
		var photoSrc = data.icon;
		if(data.photos){
			//photoSrc = "api/image/" + data.photos[0].photo_reference;
		}
		photo = <img src={photoSrc} />
		var icon = <ImageControlPoint/>
		var tooltip;
		if(this.props.userHoppin ){
			icon = <ActionHighlightOff/>;
			tooltip = "Remove Yourself";
		}else {
			tooltip = "Add Yourself"
		}
		if(disabled){
			tooltip = "Login to RSVP";
		}
		return(
			<li>
				<div className="bar-photo">
					{photo}
				</div>
				<div className="bar-details">
					<div className="bar-name">{data.name}</div>
					<div className="bar-address">{data.formatted_address}</div>
				</div>
				<div className="bar-hoppers">
					<IconButton
						onClick={this.props.onToggleBar.bind(null, data.id)}
						disabled={disabled} 
						tooltip={tooltip}>
						{icon}
					</IconButton>
					<div className="badge">{data.goers || 0} people going</div>
				</div>
			</li>
		);*/