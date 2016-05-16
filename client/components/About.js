'use strict';

var React = require('react');
var Dialog = require('material-ui').Dialog;
var RaisedButton = require('material-ui').RaisedButton;

module.exports=React.createClass({
    displayName: 'About',
    render: function(){
        return(
            <Dialog
                title="About BarHoppin'"
                modal={false}
                open={this.props.open}
                actions={
                    <RaisedButton 
                        label="Close"
                        primary={true}  
                        onTouchTap={this.props.aboutHandler} />
                    }
                onRequestClose={this.props.aboutHandler}>
                <div className="about">
                    <p>BarHoppin' App is my impementation of FreeCodeCamp <a href="https://www.freecodecamp.com/challenges/build-a-nightlife-coordination-app">"Build a Nightlife Coordination App"</a> challenge</p> 
                    <p>With BarHoppin' App you can search for bars in your area, and see how meny people will go to sertan bars.
                     You can login with your twitter account, and then you can add yourself to a bar to indicate you are going there tonight.
                     You can also remove yourself if you change your mind.</p>
                    <p><a href="https://www.freecodecamp.com">FreeCodeCamp</a> is an open source community that helps you learn to code.</p>
                    <div className="about-tools">
                        <h3>Main tools and libraries used:</h3>
                        <ul>
                            <li>
                                <a href="https://nodejs.org/en/">Node.js</a>
                            </li>
                            <li>
                                <a href="http://expressjs.com/">Express.js</a>
                            </li>
                            <li>
                                <a href="https://www.firebase.com/">Firebase</a>
                            </li>
                            <li>
                                <a href="https://facebook.github.io/react/">React.js</a>
                            </li>
                            <li>
                                <a href="http://www.material-ui.com">Material-ui</a>
                            </li>
                        </ul>
                    </div>
                    <p>Search results provided by <a href="https://developer.foursquare.com/">Foursquare API</a></p>
                    <p><a href="https://github.com/golle404/bar-hoppin">Source</a> <a href="https://www.freecodecamp.com/golle404">FreeCodeCamp profile</a></p>
                </div>
            </Dialog>
        );
    }
})