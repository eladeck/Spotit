import React, { Component } from "react"
import Loader from 'react-loader-spinner'
import GeneralInfoMaterialUI from './GeneralInfoMaterialUI'
import axios from 'axios';

class GeneralInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:null,
            airport: null
            // currentLoggedInUser: this.props.loggedInUser,
            // userProfile: this.props.desiredUserProfile
        }

        this.fetchInfoForPage = this.fetchInfoForPage.bind(this);
        this.getDefaultPicture = this.getDefaultPicture.bind(this);
    } // c'tor

    // methods:
    // componentDidMount() {
    //     const fetchString = `/airport/${this.props.match.params.airportName}`
    //     console.log(`in Airport coopmonent did mount, gonna fetch ${fetchString}`)
    //     fetch(fetchString, {method: 'GET', credentials: 'include'})
    //     .then(res => res.json())
    //     .then(realObj => {
    //         console.log(realObj)
    //     })
    // } // componentDidMount



    // componentDidMount() {
    //     if(!this.props.desiredUserProfile) {console.log(`I was render without props user ----`);return;}
    //     console.log(`i was renders WITH props`)
    //     // fetch(`http://localhost:3002/airport/getImages?name=${this.props.airportName}`, {method: 'GET', credentials: 'include'})
    //     fetch(`http://localhost:3002/airport/getImages?name=El Arish International Airport`, {method: 'GET', credentials: 'include'})
    //     .then(response => response.json())
    //     .then(images => {console.log(`!!!!!!!!!!!!!!!!!!`); console.log(images); this.setState({images})});
    // } // didMount

    async componentDidMount() {
       await this.fetchInfoForPage();
    } // componentDidMount

    async componentDidUpdate(PrevProps) {
        console.log("GeneralInfo: componentDidUpdate(): PrevProps and props are");
        console.log(PrevProps)
        console.log(this.props);
        
        if (PrevProps.match.url !== this.props.match.url) {
            
            console.log("GeneralInfo: urls are different!");
            await this.fetchInfoForPage();
        }
    }

    async fetchInfoForPage() {
        try{
            console.log("in Airport.js: componentDidMount():  desired airport is:")
            let fieldValue = this.props.match.params.fieldValue;
            let fieldName = this.props.match.params.fieldName;

            console.log(`${this.props.match.params.fieldName}`);
            console.log(`${this.props.match.params.fieldValue}`);
            if (fieldName ==="airport" && !fieldValue.includes("Airport")) {
                fieldValue = fieldValue.concat("Airport");
            }
            
            const searchValue = encodeURIComponent(fieldValue);
            console.log(`&&&&&`);
            const result = await axios(`https://cors-anywhere.herokuapp.com/en.wikipedia.org/w/api.php?action=opensearch&search=${searchValue}`);
            
            
            // console.log("in Airport.js: componentDidMount():  Wikipedia result is:")
            // console.log(result)



            //console.log(this.props.desiredAirport);
            //console.log(result.data[2]);
            this.setState({data: {headline: result.data[1][0], detailedInfo: result.data[2]}});
            //console.log("in Airport.js: componentDidMount():  state.airportData is:")
           // console.log(this.state.airport.airportData);
           // console.log(result.data[1][0]);
            //result.data[2].forEach(el => console.log(el));

            //Try to imlement a general request from the server, so we wont have to implement requests for every case..

            fetch(`/data/general/${fieldName}/${this.props.match.params.fieldValue}`, {method: 'GET', credentials: 'include'})
            .then(res => res.json())
            .then(realImages => {


                // console.log(`GeneralInfo: first fetch('/data/general/') realImages is`);
                // console.log(realImages);



                this.setState({images: realImages});  

            }).catch(err => {console.log("in Airport.js: componentDidMount(): in fetch->catch. errr is: "); console.log(err);})

        let url = "https://en.wikipedia.org/w/api.php"; 

        //console.log(`Airport.js: this.state.data.headline = ${this.state.data.headline}`);

        var params = {
            action: "query",
            prop: "images",
            titles: this.state.data.headline,
            format: "json"
        };

        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

        fetch(url)
            .then(response => {return response.json();})
            .then(response => {
                //let mainInfoImage = 'http://avi-asia.com/wp-content/uploads/2016/06/0_0_1292_808_airportdev.png';
                let mainInfoImage = this.getDefaultPicture(fieldName);
                var pages = response.query.pages;
                
                
                // console.log("Airport.js: in second fetch, response is: ")
                // console.log(response);
               
               
                //var mainInfoImage = encodeURIComponent(response.query.pages[0].images[6]);
                //var mainInfoImage = encodeURIComponent("File:SdeDovAerodrome-Red.jpg");
                for (var page in pages) {
                    if( pages[page].images) {

                        for (var img of pages[page].images) {
                            // console.log(img.title);
                            // console.log(typeof img.title);
                           if (img.title.includes(params.titles)) {
                                mainInfoImage = encodeURIComponent(img.title);
                                mainInfoImage = `https://commons.wikimedia.org/wiki/Special:FilePath/${mainInfoImage}`;
                                break;
                           }
    
                        }
                    }

                    break;
                }

                // console.log(`main image url is: ${mainInfoImage}`);
                
                
                this.setState({data: {imageUrl: mainInfoImage, headline: result.data[1][0], detailedInfo: result.data[2]}});

            })
            .catch(function(error){console.log(error);});
        } catch(err) {
            console.log("in Airport.js: componentDidMount(): in catch section. Error is:"); 
            console.log(err);
        }
    }

    getDefaultPicture(fieldName) {
        let url = '';
        switch(fieldName) {
            case 'airport':
                url = '/defaultPicturesToBeDisplayed/defaultAirport.png';
            break;
            case 'airline':
                    url = '/defaultPicturesToBeDisplayed/defaultAirline.jpg';
            break;
            case 'airplaneModel':
                    url = '/defaultPicturesToBeDisplayed/defaultAirline.jpg';
            break;
            case 'city':
                    url = '/defaultPicturesToBeDisplayed/defaultCity.jpg';
            break;
            default:
                    url = '/defaultPicturesToBeDisplayed/defaultAirport.png';
            break;
        }

        return url;
    }

    render() {

        console.log(`in render of Airport`)

        return (
            // !airportInfo ? <Loader type="TailSpin" color="blue" height={120} width={120} /> :
            <>
            <h1>Airport Page</h1>
                {(this.state.data && this.state.images) ? 
                <GeneralInfoMaterialUI
                    data={this.state.data}
                    loggedInUser={this.props.loggedInUser}
                    images={this.state.images}
                /> 
                :
                <Loader type="TailSpin" color="blue" height={120} width={120} />
                }
            </>
        );
    } // render
} // class

export default GeneralInfo

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


        fetch(`/user/profile/${this.props.userName}`, {method:'GET', credentials:'include'})
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