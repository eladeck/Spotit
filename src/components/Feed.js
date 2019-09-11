
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

    componentDidMount() {
        this.setState({comments: this.props.comments})
    }

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

                        
                    {/* ---- dor code: <h2><Link to="/main">{el.user}</Link></h2>*/}
                    
                    {/* <label className="like-count">{image.likes > 0 ? image.likes : null}</label> */}
                    <label className="like-count">{image.likes.length + maybeAddOneToLikes}</label>
                    
                    <i onClick={(e) => this.handleLike(image._id, image, e)} class={likeClassName}></i>
                    <h2 onClick={() => this.handleGoToProfile(image.userName)}>
                        <Link to={`/profile/${image.userName}`}>{image.userName}</Link>
                    </h2>
                    {/*<div className='img-grade'>&#9733; &#9733; &#9733; &#9734; &#9734;</div>*/}
                    <Popup
                      trigger={<img id="myModal" src={`${image.userName}/${image.url}`} alt="not working" onClick={() => {console.log("Image Modal")}} />}
                      modal
                      closeOnDocumentClick
                    >
                      <span>
                           <img id="myModal" src={`${image.userName}/${image.url}`} alt="not working" onClick={() => {console.log("Image Modal")}} style={{width:"100%", maxWidth:"850px"}} /> 
                           {console.log(image)}
                           <Comments 
                            comments={image.comments} 
                            imageId={image._id}
                            extratAllFollowing={this.props.extratAllFollowing}
                            />
                           {/* <ol className="img-comments">
                               {image.comments.map((commentObj, i) => (
                               <li key={i} className="comment">
                                   <div>{commentObj.userName}</div>
                                   <div>{commentObj.text}</div>
                                   <div>{commentObj.date}</div>
                               </li>))}
                           </ol> */}
                           {/* <input type="text" />
                           <button onClick={this.handleNewComment}>+</button> */}
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
                {images ? (images.length === 0 ? noImgMsg : images) : 
                    <Loader type="TailSpin" color="lightgreen" height={80} width={80} />}
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
