'use strict';

var React = require("react");
var SearchForm = require("./SearchForm.js");
var BarList = require("./BarList.js");
var Snackbar = require("material-ui").Snackbar;
var nanoajax = require("nanoajax");

var mesplate = [["removed", "from"], ["added", "to"]];

module.exports=React.createClass({
	displayName: 'Content',
	getInitialState: function(){
		return {
			query: "belgrade",
			bars: [],
			snackbarOpen: false,
			snackbarMsg: ""
		};
	},
	handleChange: function(e){
		this.setState({query: e.target.value})
	},
	handleSearch: function(e){
		if(e){
			e.preventDefault();
		}
		var url = "api/search/" + this.state.query;
		nanoajax.ajax({url: url, method: "POST"}, this.onSearchRecieved)
	},
	onSearchRecieved: function(code, response){
		if(code === 200){
			var bars = JSON.parse(response).results;
		    this.setState({bars: bars});
		  }else{
		    console.log("error")
		  }
	},
	onDispatch: function(name, rsvp){
		var msg = mesplate[Number(rsvp)];
		var msgEl = <div className={"snackbar "+msg[0]}>You {msg[0]} yourself {msg[1]} {name}</div>
		this.setState({
			snackbarOpen: true,
			snackbarMsg: msgEl
		});
	},
	handleRequestClose: function(){
		this.setState({snackbarOpen: false});
	},
	render: function(){
		return(
			<div className="content">
				<SearchForm 
					query={this.state.query}
					handleChange={this.handleChange}
					handleSearch={this.handleSearch} />
				<BarList 
					user={this.props.user}
					data={this.state.bars}
					dispatch={this.onDispatch} />
				<Snackbar
					open={this.state.snackbarOpen}
					message={this.state.snackbarMsg}
					autoHideDuration={3000}
					onRequestClose={this.handleRequestClose}/>
			</div>
		);
	}
})		
