
import React, { Component } from "react"
import Loader from 'react-loader-spinner'
import Popup from "reactjs-popup";
import Comments from "./Comments";
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'



class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likedImages:[],
            // images:[],
        } // Feed state

        this.importImages = this.importImages.bind(this);
        this.handleGoToProfile = this.handleGoToProfile.bind(this);
        this.handleLike = this.handleLike.bind(this);
    } // c'tor



    removeImageFromArray(imgId) {
        this.setState(prevState => {
            let likedImages = prevState.likedImages;
            let indexToRemove = likedImages.indexOf(imgId);
            if (indexToRemove !== -1) likedImages.splice(indexToRemove, 1);
            return {likedImages};
        })
    }

    handleLike(imgId,imageObj, e) {
        e.preventDefault();
        if(this.state.likedImages.includes(imgId) || imageObj.likes.includes(this.props.loggedInUser.userName)) {
            console.log("trying to like a liked image! in future we will support revert like (unlike)")
            return;
        }

        // adding imgId to the likedImage Array for the immdeiate render to the client 
        this.setState(prevState => ({
            likedImages: [...prevState.likedImages, imgId]
          }))

          console.log(imageObj)

          // and then making net call
        fetch(`/image/like?id=${imgId}&happyUserName=${imageObj.userName}`, {method:"GET", credentials:"include"})
        .then(res => res.json)
        .then(res => {if(res.errMsg) removeImageFromArray(imgId); this.props.spotitsfetchAllUsers()})
        .catch(err => removeImageFromArray(imgId))
        } // handleLike

    handleGoToProfile(userName) {
        fetch(`/user/profile/${userName}`, {method:'GET', credentials: "include"})
        .then(res => res.json())
        .then(user => {
            console.log(`Feed.js: handleGoToProfile: inside second then. user is `);
            console.log(user);
            this.props.setDesiredUser(user);
        }).catch(err => {
            console.log("Feed.js: handleGoToProfile(): inside catch. error is: ");
            console.log(err);
        })
    } // handleGoToProfile

    // handleNewComment() {

    // }

    importImages() {
        if(this.props.allFollowingImages === "NO IMAGES!") {
            return [];
        }
        if(!this.props.allFollowingImages || this.props.allFollowingImages.length === 0) {
            console.log(`in Feed, allFollowingImages is null or of length zero`)
            return this.props.allFollowingImagesull;
        } else {

            const imageWrappers = this.props.allFollowingImages.map((image, i) => {
                let loggedInUserLikedThisImage;
                if(this.props.loggedInUser) {
                    console.log(this.props.loggedInUser.userName)
                    console.log(image)
                    loggedInUserLikedThisImage = image.likes.includes(this.props.loggedInUser.userName)
                }
                console.log(image)

                let likeClassName = "fas fa-thumbs-up like";
                if(loggedInUserLikedThisImage || this.state.likedImages.includes(image._id)) {
                    likeClassName = "fas fa-thumbs-up liked";
                } 

                const maybeAddOneToLikes = this.state.likedImages.includes(image._id) ? 1 : 0;

                return (
                <div key={i} className="image-wrapper">
                    <label className="like-count">{image.likes.length + maybeAddOneToLikes}</label>
                    <i onClick={(e) => this.handleLike(image._id, image, e)} class={likeClassName}></i>
                    <Link to={`/profile/${image.userName}`}>
                        <h2>{image.userName}</h2>
                    </Link>
                    <Popup
                      trigger={<img id="myModal" src={`${image.userName}/${image.url}`} alt="not working" onClick={() => {console.log("Image Modal")}} />}
                      modal
                      closeOnDocumentClick
                    >
                      <span>
                          <div className="hoverable-image-container">
                               <img className="hoverable-image" id="myModal" src={`${image.userName}/${image.url}`} alt="not working" onClick={() => {console.log("Image Modal")}} style={{width:"100%", maxWidth:"850px"}} /> 
                               <div className="hoverable-overlay">
                                   <p>{image.description}</p>
                                </div>
                          </div>
                           {console.log(image)}
                           <Comments 
                                comments={image.comments} 
                                imageId={image._id}
                                extratAllFollowing={this.props.extratAllFollowing}
                                loggedInUser={this.props.loggedInUser}
                            />
                      </span>
                    </Popup>
                    
                    <div id="myModal" class="modal">
                        <span className="close">&times;</span>
                        <img className="modal-content" id="img01" />
                        <div id="caption"></div>
                    </div>
                </div>
                )
            });

            return imageWrappers;
          } // else
    } // importImages



    render() {
        const images = this.importImages();
        console.log(images)
        const noImgMsg = <div>No picrutes to display. please click 'follow' above, to follow a spotter with images, or encourage your followings to upload some.</div>;
        
        return (
            <div className="feed">
                <h1 className="title">Spotit Feed</h1>
                <Link to="/imageForm"><img className="feed-post-image" title="Post" src="cameraIcon.png" /></Link>
                { (this.props.loggedInUser && this.props.loggedInUser.reportPermission) ? <Link to="/reportSpecials"><img className="feed-post-image" title="Report Special Arrival" src="megaphone.png" /></Link> : null}
                {images ? (images.length === 0 ? noImgMsg : images) : 
                    <Loader type="TailSpin" color="lightblue" height={80} width={80} />}
            </div>
        ); 
    } // render
} // Feed Component

export default Feed


/**            <div className="feed">
                <h1 className="title">Spotit Feed</h1>
                <div className="image-wrapper">
                    <h2>Dor Ben Lulu</h2>
                    <img src={img1} alt="not working" />
                </div>
                <div className="image-wrapper">
                  <h2>Elad Eckstein</h2>
                  <img src={img2} alt={"not working"} />
                </div>
                <div className="image-wrapper">
                  <h2>Ilan Kirsh</h2>
                  <img src={img1} alt={"not working"} />
                </div>
        </div> */
