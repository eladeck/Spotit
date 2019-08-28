
import React, { Component } from "react"
import Loader from 'react-loader-spinner'

import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'



class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // images:[],
        } // Feed state

        this.importImages = this.importImages.bind(this);
        this.handleGoToProfile = this.handleGoToProfile.bind(this);
        this.handleLike = this.handleLike.bind(this);
    } // c'tor

    handleLike(imgId) {
        fetch("/image/like?id="+imgId, {method:"GET", credentials:"include"})
        .then(res => res.json)
        .then(res => alert("ok! liked this image! refresh!"))
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

    importImages() {
        if(!this.props.allFollowingImages) {

            console.log(`in Feed, allFollowingImages is null`)
            return null;
        } else {

            const imageWrappers = this.props.allFollowingImages.map(image => {
                console.log("123456)")
                console.log(image)
                return(
                <div key={image.url + image.user} className="image-wrapper">
                        
                    {/* ---- dor code: <h2><Link to="/main">{el.user}</Link></h2>*/}
                    
                    {/* <label className="like-count">{image.likes > 0 ? image.likes : null}</label> */}
                    <label className="like-count">{image.likes}</label>
                    <i onClick={() => this.handleLike(image._id)} class="fas fa-thumbs-up like"></i>
                    <h2 onClick={() => this.handleGoToProfile(image.userName)}>
                        <Link to={`/profile/${image.userName}`}>{image.userName}</Link>
                    </h2>
                    <div className='img-grade'>&#9733; &#9733; &#9733; &#9734; &#9734;</div>
                    <img src={`${image.userName}/${image.url}`} alt="not working" />
                </div>
                )
            });
            
            return this.shuffleArray(imageWrappers);
          } // else
    } // importImages

    shuffleArray(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    render() {
        const images = this.importImages();
        console.log(`images to show in feed are:`)
        console.log(images)
        
        return (
            <div className="feed">
                <h1 className="title">Spotit Feed</h1>
                {console.log('0000000000000000000000000000000')}
                {console.log(images)}
                {images ? images : <Loader type="TailSpin" color="lightgreen" height={80} width={80} />}
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
