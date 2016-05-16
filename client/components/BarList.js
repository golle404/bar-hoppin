'use strict';

var React = require("react");
var BarItem = require("./BarItem.js");

module.exports=React.createClass({
	displayName: 'BarList',
	render: function(){
		var user = this.props.user;
		var dispatch = this.props.dispatch;
		return(
			<ul className={"bar-list " +this.props.className} >
				{this.props.data.map(function(v,i){
					return (
						<BarItem 
							key={i} 
							data={v} 
							user={user}
							dispatch={dispatch} />
					)
				})}
			</ul>
		);
	}
})