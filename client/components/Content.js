'use strict';

var React = require("react");
var SearchForm = require("./SearchForm.js");
var BarList = require("./BarList.js");
var Snackbar = require("material-ui").Snackbar;
var CircularProgress  = require("material-ui").CircularProgress 
var nanoajax = require("nanoajax");

var mesplate = [["removed", "from"], ["added", "to"]];

module.exports=React.createClass({
	displayName: 'Content',
	getInitialState: function(){
		return {
			query: "",
			bars: [],
			snackbarOpen: false,
			snackbarMsg: "",
			showProgress: false
		};
	},
	componentWillMount: function(){
		if(this.props.search){
			this.setState({query: this.props.search}, this.handleSearch)
		}
	},
	handleChange: function(e){
		this.setState({query: e.target.value})
	},
	handleSearch: function(e){
		if(e){
			e.preventDefault();
		}
		var url = "api/foursquare/" + this.state.query;
		nanoajax.ajax({url: url, method: "POST"}, this.onSearchRecieved)
		this.setState({showProgress: true})
	},
	onSearchRecieved: function(code, response){
		//console.log(code, response)
		if(code === 200){
			this.setState({showProgress: false})
			//var bars = JSON.parse(response).results;
			var bars = JSON.parse(response).response.venues;
			console.log(bars)
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
	progressClass: function(){
		return this.state.showProgress ? "" : "hidden"
	},
	listClass: function(){
		return this.state.showProgress ? "hide" : "show"	
	},
	render: function(){
		return(
			<div className="content">
				<SearchForm 
					query={this.state.query}
					handleChange={this.handleChange}
					handleSearch={this.handleSearch} />
				<CircularProgress
					className={this.progressClass()} 
					size={2}
					style={{left: "50%", marginLeft: "-45px"}} />
				<BarList 
					className={this.listClass()} 
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
