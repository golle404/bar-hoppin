'use strict';

var React = require("react");
var SearchForm = require("./SearchForm.js");
var BarList = require("./BarList.js");
var nanoajax = require("nanoajax");

module.exports=React.createClass({
	displayName: 'Content',
	getInitialState: function(){
		return {query: "belgrade", bars: []};
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
	render: function(){
		return(
			<div className="content">
				<SearchForm 
					query={this.state.query}
					handleChange={this.handleChange}
					handleSearch={this.handleSearch} />
				<BarList 
					user={this.props.user}
					data={this.state.bars} />
			</div>
		);
	}
})		
