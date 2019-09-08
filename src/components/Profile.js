import React, { Component } from "react"
import Loader from 'react-loader-spinner'
import ProfileMaterialUI from './ProfileMaterialUI'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:null,
            currentProfileUser: null
            // currentLoggedInUser: this.props.loggedInUser,
            // userProfile: this.props.desiredUserProfile
        }

        this.handleFollow = this.handleFollow.bind(this);
        this.fetchImagesAndUser = this.fetchImagesAndUser.bind(this);
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
        console.log(`444444444444444444444`)
        console.log(`ComponentDidMount()`)
        console.log(this.props)
        console.log(`44444444444444444444`)
        
        console.log(`i was renders WITH props`)
        this.fetchImagesAndUser();
        // fetch(`/user/getUser?userName=${this.props.match.params.userName}`, {method:'GET', credentials:'include'})
        // .then(response => response.json())
        // .then(currentProfileUser => { 
        //     console.log("ComponentDidUpdate: in second then of fetch(`/user/getUser?userName).")
        //     this.setState({currentProfileUser})
        // })

        // fetch(`/user/getImages?userName=${this.props.match.params.userName}`, {method: 'GET', credentials: 'include'})
        // .then(response => response.json())
        // .then(images => {console.log("ComponentDidUpdate: in second then of fetch(`/user/getImages?userName)."); console.log(images); this.setState({images})});
        
    } // didMount

    componentDidUpdate(prevProps) {
        console.log(`in componentDidUpdate`);

        if(prevProps.match.params.userName !== this.props.match.params.userName) {
            // fetch(`/user/getUser?userName=${this.props.match.params.userName}`, {method:'GET', credentials:'include'})
            // .then(response => response.json())
            // .then(currentProfileUser => { 
            //     console.log("ComponentDidUpdate: in second then.")
            //         this.setState({currentProfileUser})
            // })
            this.fetchImagesAndUser();
        }
    }

    fetchImagesAndUser() {

        // Fetch of the user object
        fetch(`/user/getUser?userName=${this.props.match.params.userName}`, {method:'GET', credentials:'include'})
        .then(response => response.json())
        .then(currentProfileUser => { 
            console.log("ComponentDidUpdate: in second then of fetch(`/user/getUser?userName).")
            this.setState({currentProfileUser})
        })

        // Fetch of the user's images
        fetch(`/user/getImages?userName=${this.props.match.params.userName}`, {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(images => {console.log("ComponentDidUpdate: in second then of fetch(`/user/getImages?userName)."); console.log(images); this.setState({images})});
        
    }
    
    render() {

        //const currentProfileUser = this.props.desiredUserProfile;
        const loggedInUser = this.props.loggedInUser;
        console.log(`in render of Profile`)
        console.log(this.props.match.params)

        return (
            !this.state.currentProfileUser ? <Loader type="TailSpin" color="blue" height={120} width={120} /> :
            <>
                <ProfileMaterialUI
                    currentProfileUser={this.state.currentProfileUser}
                    loggedInUser={loggedInUser}
                    images={this.state.images}
                    handleFollow={this.props.handleFollow}
                    handleUnfollow={this.props.handleUnfollow}
                />
            </>
        );
    } // render
} // class

export default Profile

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