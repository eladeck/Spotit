
import React, { Component } from "react"
import Loader from 'react-loader-spinner'

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usersPage: props.usersPage,
            usersPostImages: null,
            currentLoggedInUser: props.loggedInUser,
            isFollowedByCurrentUser: props.loggedInUser.following.contains(props.usersPage.userName)
        }

        this.handleFollow = this.handleFollow.bind(this);
    }

    
    handleFollow() {
        
        // Remove current user from Following array.
        if(this.state.isFollowedByCurrentUser) {
            const updatedFollowing = this.state.currentLoggedInUser.following.filter(el => {
                return el !== this.state.usersPage.userName;
            });

            removeFollower();
        } else {
            addFollower();
        }

        
    } // handleFollow
    
    componentWillMount() {
        // Bring the images from server, not database.
    }
    render() {

        return (
            <>
                <h2>{this.state.usersPage.firstName} {this.state.usersPage.lastName}</h2>
                <button onClick={this.handleFollow}>{isFollowedByCurrentUser ? {Follow} : {Following}}</button>
                {this.state.usersPostImages.map(el => {
                    return(
                        <div key={el._id} className="image-wrapper">
                            <div className='img-grade'>&#9733; &#9733; &#9733; &#9734; &#9734;</div>
                            <img src={el.url} alt="not working" />
                        </div>);
            })}
            </>
        );
    }
}