'use strict';

var React = require("react");
var TextField = require("material-ui").TextField;
var RaisedButton = require("material-ui").RaisedButton;

module.exports=React.createClass({
	displayName: 'SearchForm',
	render: function(){
		return(
			<form className="search-form" action="" onSubmit={this.props.handleSearch}>
				<TextField 
					hintText="Name of city you are in"
      				floatingLabelText="Find bars in ..."
      				value={this.props.query} 
					onChange={this.props.handleChange}
					autoFocus="true" />
  				<RaisedButton label="GO" primary={true} type="submit"/>
			</form>
		);
	}
})
