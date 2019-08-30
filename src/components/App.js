import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header";
import Container from "./Container";

class App extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        loggedInUser:null,
                        userWantsToLogout:false,
                        
                }
        this.updateLoggedInUser = this.updateLoggedInUser.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleNewFollow = this.handleNewFollow.bind(this)
        // this.handleUrlChange = this.handleUrlChange.bind(this)
        } //

        handleNewFollow() {
                console.log("in App handleNewFollow")
                // Header told the db that we know follow new guy, 
                // hence I want to re-render container,
                // cause it'll extract my followings and will show the new images of folloing
                this.forceUpdate();
        }

        handleLogout() {
                this.setState({
                        userWantsToLogout:true,
                        loggedInUser:null})
              fetch('/user/logout', {method:"GET", credentials:"include"})
        } // handleLogout
        
        updateLoggedInUser(loggedInUser) {
                this.setState({loggedInUser, userWantsToLogout:false})
        } // updateLoggedInUser

        // handleUrlChange() { // This method is used in order to make the Container rendered after the Header has changed the URL.
        //         console.log(`App.js: In handleUrlChange().`);
        //         this.setState(prevState => {prevState});
        // }

        render() {
                console.log("in App Render")
                
                return (
                <Router>
                        <Header
                                loggedInUser={this.state.loggedInUser}
                                handleLogout={this.handleLogout}
                                handleUrlChanged={this.handleUrlChange}
                                handleNewFollow={this.handleNewFollow}
                         />
                        <Container
                         loggedInUser={this.state.loggedInUser}
                         updateLoggedInUser={this.updateLoggedInUser}
                         userWantsToLogout={this.state.userWantsToLogout}
                         />
                </Router>
           );
        } // render
} // class

export default App;