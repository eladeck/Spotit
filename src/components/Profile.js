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
        fetch(`/user/follow?userNameToFollow=${this.props.desiredUserProfile.userName}`, {method:'POST', credentials:"include"})
        .then(res => res.json())
    } // handleFollow


    componentDidMount() {
        this.fetchImagesAndUser();
    } // didMount

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.userName !== this.props.match.params.userName) {
            this.fetchImagesAndUser();
        }
    }

    fetchImagesAndUser() {
        // Fetch of the user object
        fetch(`/user/getUser?userName=${this.props.match.params.userName}`, {method:'GET', credentials:'include'})
        .then(response => response.json())
        .then(currentProfileUser => { 
            this.setState({currentProfileUser});
            
            // Get the profile pictures of all followers and following.
            return fetch(`/user/getFollowersProfilePicture?userName=${this.props.match.params.userName}`, {method:'GET', credentials:'include'})
        })
        .then(response => { 
            response.json().then(followersPicture => {
                const followingProfilePicture = followersPicture.followingProfilePicture;
                const followedByProfilePicture = followersPicture.followedByProfilePicture;
                this.setState({followingProfilePicture, followedByProfilePicture});
            }) 
        }) // responsone from fetch(`/user/getFollowersProfilePicture)
        .catch(err => { 
            console.log(err);
        })

        // Fetch of the user's images
        fetch(`/user/getImages?userName=${this.props.match.params.userName}`, {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(images => {this.setState({images})});
        
    }
    
    render() {
        //const currentProfileUser = this.props.desiredUserProfile;
        const loggedInUser = this.props.loggedInUser;

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