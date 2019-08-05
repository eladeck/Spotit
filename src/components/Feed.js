
import React, { Component } from "react"
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'



class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // images:[],
        } // Feed state

        this.importImages = this.importImages.bind(this);
        this.getImgesFromDB = this.getImgesFromDB.bind(this);
        this.handleGoToProfile = this.handleGoToProfile.bind(this);



    } // c'tor

    handleGoToProfile(userName) {

        fetch(`/user/profile/${userName}`, {method:'GET', credentials: "include"})
        .then(res => res.json())
        .then(realObj => {

        })





    } // handleGoToProfile

    importImages() {
        
        // 1. Import images from the Database.
        // this.setState(prevState => {
        //     return {
        //         images: this.getImgesFromDB()
        //     }
        // });

        // 2. Create array of components (images) that will be displayed in the news feed.
        if(!this.props.allFollowingImages) {

            console.log(`in Feed, allFollowingImages is null`)
            return null;
        } else {

            const imageWrappers = this.props.allFollowingImages.map(el => {
                // console.log(`el is`)
                // console.log(el)
                return(
                    <div key={el.url + el.user} className="image-wrapper">
                    {/* <h2><a style={{textDecoration:"none"}} href={`/user/profile/${el.userName}`}>{el.user}</a></h2> */}
                    <h2 onClick={() => this.handleGoToProfile(el.userName)}>{el.user}</h2>
                    {/* <Link to={`/profile`}></Link> */}
                    {/* <Link to="/profile">{el.user}</Link> */}
                    {/* <Link to={{pathName:`/profile`, userName:el.userName, loggedInUser:this.props.loggedInUser}}> */}
                        {/* <h2>{el.user}</h2> */}
                        {/* <h2 onClick={() => this.handleGoToProfile(el.userName)}>{el.user}</h2> */}
                    {/* </Link> */}

                    <div className='img-grade'>&#9733; &#9733; &#9733; &#9734; &#9734;</div>
                    <img src={el.url} alt="not working" />
                </div>
                )
            });
        
            return imageWrappers;
          } // else
    } // importImages

    getImgesFromDB() {
        const jsonImages = [
            {
                "id": "123",
                "user": "Dor Ben Lulu",
                "date": "",
                "url": "/img/LYB737.jpg",
                "brand": "Boeing",
                "model": "737-800",
                "company": "EL-AL",
                "country": "Israel",
                "city":"Tel-Aviv",
                "airport":"Ben Gurion",
                "code": "TLV"
            },
            {
                "id": "124",
                "user": "Elad Eckstein",
                "date": "",
                "url": "/img/BAA380.jpg",
                "brand": "Airbus", 
                "model": "A380-300",
                "company": "British Airways",
                "country": "United Kingdom",
                "city":"London",
                "airport":"Heathrow",
                "code": "LHR"
            },
            {
                "id": "124",
                "user": "Dar Paran",
                "date": "",
                "url": "/img/LYB737.jpg",
                "brand": "Boeing", 
                "model": "787-800",
                "company": "TUI",
                "country": "Israel",
                "city":"Tel-Aviv",
                "airport":"Ben Gurion",
                "code": "TLV"
            }

        ];
        return  jsonImages;
    }
    render() {
        const images = this.importImages();
        return (
            <div className="feed">
                <h1 className="title">Spotit Feed</h1>
                {images ? images : <Loader type="TailSpin" color="green" height={80} width={80} />}

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
