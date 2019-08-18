import React, { Component } from "react"
import Loader from 'react-loader-spinner'
import AirportMaterialUI from './AirportMaterialUI'


class Airport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:null,
            // currentLoggedInUser: this.props.loggedInUser,
            // userProfile: this.props.desiredUserProfile
        }

        this.handleFollow = this.handleFollow.bind(this);
    } // c'tor

    // methods:
    handleFollow() {

        console.log("Profile.js: handleFollow(): desiredUserProfile.userName is:")
        console.log(this.props.desiredUserProfile.userName);
        fetch(`/user/follow?userNameToFollow=${this.props.desiredUserProfile.userName}`, {method:'POST', credentials:"include"})
        .then(res => res.json())
        // .then(newListOfFollowings => this.setState({newListOfFollowings}))


    } // handleFollow


    componentDidMount() {
        if(!this.props.desiredUserProfile) {console.log(`I was render without props user ----`);return;}
        console.log(`i was renders WITH props`)
        // fetch(`http://localhost:3002/airport/getImages?name=${this.props.airportName}`, {method: 'GET', credentials: 'include'})
        fetch(`http://localhost:3002/airport/getImages?name=El Arish International Airport`, {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(images => {console.log(`!!!!!!!!!!!!!!!!!!`); console.log(images); this.setState({images})});
    } // didMount

    
    render() {

        const currentProfileUser = this.props.desiredUserProfile;
        const loggedInUser = this.props.loggedInUser;
        console.log(`in render of Profile`)
        console.log(this.props.desiredUserProfile)

        return (
            !currentProfileUser ? <Loader type="TailSpin" color="blue" height={120} width={120} /> :
            <>
                <AirportMaterialUI
                    airportName={"El Arish International Airport"}
                    loggedInUser={loggedInUser}
                    images={this.state.images}
                />
            </>
        );
    } // render
} // class

export default Airport

/*
 import React, { Component } from "react"
import Loader from 'react-loader-spinner'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:null,
        }

        this.handleFollow = this.handleFollow.bind(this);

    } // c'tor

    // methods:
    handleFollow() {
        fetch(`/user/follow?
        loggedInUserName=${this.props.loggedInUser}&
        userNameToFollow=${this.props.userName}`, {method:'POST', credentials:"include"})
        .then(res => res.json())
        // .then(newListOfFollowings => this.setState({newListOfFollowings}))


    } // handleFollow


    componentDidMount() {

        console.log(`in componoetDidMount ofProfile, props are userName and loggedInUser:`)
        console.log(this.props.loggedInUser)
        console.log(this.props.userName)


        fetch(`user/profile/${this.props.userName}`, {method:'GET', credentials:'include'})
        .then(res => res.json())
        .then(user => {
            if(user.errorMsg) throw user.errorMsg;
            this.setState({user})
        })
    } // didMount

    render() {

        const userName = this.props.userName;
        const loggedInUser = this.props.loggedInUser;

        if(!userName) return <div>no userName to show</div>

        return (
            !this.state.user ? <Loader type="TailSpin" color="blue" height={120} width={120} /> :

            <>
                <div>
                    In profile of:
                    first Name - {this.state.user.firstName}
                    <button onClick={this.handleFollow}>follow</button>

                </div>
            </>
        );
    } // render
} // class

export default Profile
 */