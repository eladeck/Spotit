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
        } //

        handleLogout() {
                this.setState({
                        userWantsToLogout:true,
                        loggedInUser:null})
        } // handleLogout
        
        updateLoggedInUser(loggedInUser) {
                this.setState({loggedInUser, userWantsToLogout:false})
        } // updateLoggedInUser

        render() {
                return (
                <Router>
                        <Header
                                loggedInUser={this.state.loggedInUser}
                                handleLogout={this.handleLogout}
                         />
                        <Container
                         updateLoggedInUser={this.updateLoggedInUser}
                         userWantsToLogout={this.state.userWantsToLogout}
                         />
                </Router>
           );
        } // render
} // class

export default App;