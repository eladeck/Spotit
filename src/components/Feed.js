
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
    } // c'tor

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

            const imageWrappers = this.props.allFollowingImages.map(el => {
                // console.log(`el is`)
                // console.log(el)
                return(
                    <div key={el.url + el.user} className="image-wrapper">
                        
                    {/* ---- dor code: <h2><Link to="/main">{el.user}</Link></h2>*/}
                    
                    <h2 onClick={() => this.handleGoToProfile(el.userName)}>
                        <Link to={`/profile/${el.userName}`}>{el.user}</Link>
                    </h2>
                    <div className='img-grade'>&#9733; &#9733; &#9733; &#9734; &#9734;</div>
                    <img src={el.url} alt="not working" />
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
