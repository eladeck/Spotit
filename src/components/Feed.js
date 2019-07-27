
import React, { Component } from "react"


class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images:[],
        } // Feed state

        this.importImages = this.importImages.bind(this);
        this.getImgesFromDB = this.getImgesFromDB.bind(this);



    } // c'tor

    importImages() {
        
        // 1. Import images from the Database.
        // this.setState(prevState => {
        //     return {
        //         images: this.getImgesFromDB()
        //     }
        // });

        // 2. Create array of components (images) that will be displayed in the news feed.
        const imageWrappers =  this.getImgesFromDB().map(el => {
            return(
                <div key={el.url + el.user} className="image-wrapper">
                    <h2>{el.user}</h2>
                    <div className='img-grade'>&#9733; &#9733; &#9733; &#9734; &#9734;</div>
                    <img src={el.url} alt="not working" />
                </div>
            )
        });

        return imageWrappers;
    }

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
        console.log()
        return (
            <div className="feed">
                <h1 className="title">Spotit Feed</h1>
                {this.importImages()}
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
