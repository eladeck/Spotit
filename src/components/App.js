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
                        refToExtractAllFollowings:null,
                        iataCodeData:null,
                }
        this.updateLoggedInUser = this.updateLoggedInUser.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        //this.handleNewFollow = this.handleNewFollow.bind(this)
        this.handleFollow = this.handleFollow.bind(this)
        this.handleUnfollow = this.handleUnfollow.bind(this)
        this.setRefToExtractAllFollowings = this.setRefToExtractAllFollowings.bind(this)
        // this.handleUrlChange = this.handleUrlChange.bind(this)
        } //

        // handleNewFollow() {
        //         this.setState({thereIsNewFollow:true})
        //         console.log("in App handleNewFollow")
        //         // Header told the db that we know follow new guy, 
        //         // hence I want to re-render container,
        //         // cause it'll extract my followings and will show the new images of folloing
        // }

        componentDidMount() {
                // for fetching airplanes and stuff
                const ms = new Date().getTime();
                fetch(`/imageFormData`, {method: 'GET', credentials: 'include'})
                .then(response => response.json())
                .then(iataCodeData => {console.log("finished");console.log(ms - new Date().getTime());this.setState({iataCodeData})})
                .catch(errMsg => this.setState({errMsg}))
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

        setRefToExtractAllFollowings(refToExtractAllFollowings) {
                this.setState({refToExtractAllFollowings});
        }

        handleUnfollow(userNameToUnfollow) {
                const shouldFetchLoggedInUserFromDb = true;
                fetch(`/user/unfollow?userNameToUnfollow=${userNameToUnfollow}`, {method:'POST', credentials:"include"})
                .then(res => res.json())
                .then(obj => {this.state.refToExtractAllFollowings(shouldFetchLoggedInUserFromDb); console.log('after'); })
        }
              
        handleFollow(userNameToFollow) {
                const shouldFetchLoggedInUserFromDb = true;
                console.log("in handleFollow")
                // e.preventDefault();
                fetch(`/user/follow?userNameToFollow=${userNameToFollow}`, {method:'POST', credentials:"include"})
                .then(res => res.json())
                .then(_ => {this.state.refToExtractAllFollowings(shouldFetchLoggedInUserFromDb); console.log('after'); })
                // .then(newListOfFollowings => this.setState({newListOfFollowings}))
        } // handleFollow
        
        render() {
                console.log("in App Render")
                
                return (
                <Router>
                        <Header
                                loggedInUser={this.state.loggedInUser}
                                handleLogout={this.handleLogout}
                                handleUrlChanged={this.handleUrlChange}
                                handleFollow={this.handleFollow}
                                handleUnfollow={this.handleUnfollow}
                                iataCodeData={this.state.iataCodeData}
                         />
                        <Container
                         loggedInUser={this.state.loggedInUser}
                         updateLoggedInUser={this.updateLoggedInUser}

                         userWantsToLogout={this.state.userWantsToLogout}
                         
                         setRefToExtractAllFollowings={this.setRefToExtractAllFollowings}
                         handleFollow={this.handleFollow}
                         handleUnfollow={this.handleUnfollow}
                         />
                </Router>
           );
        } // render
} // class

export default App;