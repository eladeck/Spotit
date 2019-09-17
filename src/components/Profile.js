import React, { Component } from "react"
import Loader from 'react-loader-spinner'
import ProfileMaterialUI from './ProfileMaterialUI'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:null,
            currentProfileUser: null,
            followingProfilePicture: null, 
            followedByProfilePicture: null
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
    } // didMount

    componentDidUpdate(prevProps) {
        console.log(`in componentDidUpdate`);

        if(prevProps.match.params.userName !== this.props.match.params.userName) {
            this.fetchImagesAndUser();
        }
    }

    fetchImagesAndUser() {

        // Fetch of the user object
        fetch(`/user/getUser?userName=${this.props.match.params.userName}`, {method:'GET', credentials:'include'})
        .then(response => response.json())
        .then(currentProfileUser => { 
            console.log("ComponentDidUpdate: in second then of fetch(`/user/getUser?userName).")
            this.setState({currentProfileUser});
            
            // Get the profile pictures of all followers and following.
            return fetch(`/user/getFollowersProfilePicture?userName=${this.props.match.params.userName}`, {method:'GET', credentials:'include'})
        })
        .then(response => { 
            console.log("response is ", response);
            response.json().then(followersPicture => {
                console.log("followersPicture is ", followersPicture)
                const followingProfilePicture = followersPicture.followingProfilePicture;
                const followedByProfilePicture = followersPicture.followedByProfilePicture;
                console.log(`Profile.js: fetchImagesAndUser(): inside inner fetch('user/getFollowersProfilePicture?userName) followedByProfilePicture and followingProfilePicture are `);
                console.log(followedByProfilePicture);
                console.log(followingProfilePicture);
                this.setState({followingProfilePicture, followedByProfilePicture});
            }) 
        }) // responsone from fetch(`/user/getFollowersProfilePicture)
        .catch(err => { 
            console.log(`Profile.js: fetchImagesAndUser(): in CATCH. Error is`);
            console.log(err);
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
        console.log(this.state.followingProfilePicture) 
        console.log(this.state.followedByProfilePicture)

        return (
            !(this.state.currentProfileUser && this.state.followingProfilePicture && this.state.followedByProfilePicture) ?  
            <div style={{position:"fixed", left:"48%", top:"40%"}}><Loader type="TailSpin" color="lightblue" height={40} width={40} /></div> 
            :
            <> 
                <ProfileMaterialUI 
                    currentProfileUser={this.state.currentProfileUser}
                    loggedInUser={loggedInUser}
                    images={this.state.images}
                    handleFollow={this.props.handleFollow}
                    handleUnfollow={this.props.handleUnfollow}
                    followingProfilePicture={this.state.followingProfilePicture}
                    followedByProfilePicture={this.state.followedByProfilePicture}
                />
            </>
        );
    } // render
} // class

export default Profile